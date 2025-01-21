import {classNames} from "shared/lib/classNames/classNames";
import {MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import {EditControl} from "react-leaflet-draw"
import {LatLngTuple, DrawEvents, Layer} from "leaflet";

import cls from './MapBox.module.scss';
import {Dispatch, SetStateAction, useState} from "react";
import {FigureModal} from "features/AddFigureName";
import {FeatureCard} from "shared/ui/FeatureCard/FeatureCard.tsx";


const START_POSITION: LatLngTuple = [51.505, -0.09]

interface MapBoxProps {
    className?: string;
    features: Layer[];
    setFeatures: Dispatch<SetStateAction<Layer[]>>;
}

export const MapBox = (props: MapBoxProps) => {
    const {className, features, setFeatures} = props;

    const [currentLayer, setCurrentLayer] = useState<Layer>({} as Layer)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [showInfo, setShowInfo] = useState<boolean>(false)

    const createdHandler = (e:DrawEvents.Created) => {
        const {layer} = e;
        setCurrentLayer(layer)
        setIsOpenModal(true);
        setFeatures(prev => [...prev, layer])
    }
    const editedHandler = (e: DrawEvents.Edited) => {
        const {layers} = e;
        layers.eachLayer((layer: Layer) => {
            setCurrentLayer(layer); // Store the selected layer
            setFeatures(prev => prev.map(feat => feat._leaflet_id === layer._leaflet_id ? layer : feat));
        });
    }
    const deletedHandler = (e: DrawEvents.Deleted) => {
        const {layers} = e;
        layers.eachLayer((layer) => {
            setFeatures(prev => prev.filter(feat => feat._leaflet_id !== layer._leaflet_id));
        });
    }

    const addName = (value: string) => {
        if (!currentLayer) return

        setFeatures(prev => prev.map(feat => {
            if (feat._leaflet_id === currentLayer._leaflet_id) {
                if (!feat.feature) feat.feature = {type: 'Feature', properties: {title: value}};
                else feat.feature.properties.text = value
            }
            return feat
        }))
        setIsOpenModal(false)
        setShowInfo(true)
    }

    return (
        <div className={classNames(cls.MapBox, {} , [className])}>
            <MapContainer
                center={START_POSITION}
                zoom={8}
                style={{height: '100%', width: '100%'}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <FeatureGroup>
                    <EditControl
                        position={"topleft"}
                        onCreated={createdHandler}
                        onEdited={editedHandler}
                        onDeleted={deletedHandler}
                        draw={{
                            rectangle: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polyline: false,
                            polygon: true,
                        }}
                    />
                </FeatureGroup>
            </MapContainer>
            <FigureModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSubmit={addName}/>
            {showInfo && <FeatureCard feature={currentLayer} onSave={() => setShowInfo(false)}/>}
        </div>
    );
};
