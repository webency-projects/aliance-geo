import {classNames} from "shared/lib/classNames/classNames";
import {FeatureGroup, GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import {EditControl} from "react-leaflet-draw"
import {DrawEvents, LatLngTuple, Layer} from "leaflet";
import cls from './MapBox.module.scss';
import {useEffect, useState} from "react";
import {FigureModal} from "features/AddFigureName";


import {useDispatch, useSelector} from "react-redux";
import {getMapData} from "../model/selectors/MapDataSelectors.ts";
import {fetchMapData} from "widgets/MapBox/model/services/fetchMapData.ts";
import {mapActions} from "widgets/MapBox/model/slice/MapBoxSlice.ts";


const START_POSITION: LatLngTuple = [-6.165132, 106.377869]

interface MapBoxProps {
    className?: string;
}

export const MapBox = (props: MapBoxProps) => {
    const {className} = props;
    const dispatch = useDispatch();

    const geoJsonData = useSelector(getMapData)

    const [center, setCenter] = useState(START_POSITION)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [currentLayer, setCurrentLayer] = useState<Layer | null>(null)

    useEffect(() => {
        dispatch(fetchMapData())
    }, [dispatch]);

    const onCreated = async (e: DrawEvents.Created) => {
        const {layer, layerType} = e;
        if (layerType === "polygon") {
            setCurrentLayer(layer)
            dispatch(mapActions.setCurrentFeature(layer.toGeoJSON()))
            setIsOpenModal(true)
        }
    }
    const addName = (value: string) => {
        if (!currentLayer) return
        currentLayer.bindPopup(value).openPopup()
        dispatch(mapActions.setPropertiesName({name: value}))
        setIsOpenModal(false)
    }

    return (
        <div className={classNames(cls.MapBox, {}, [className])}>
            <MapContainer
                center={center}
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
                        onCreated={onCreated}
                        draw={{
                            rectangle: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polyline: false,
                            polygon: true,
                        }}
                    />

                    {Object.keys(geoJsonData).length && <GeoJSON data={geoJsonData}  onEachFeature={(feature, layer) => {
                        if (feature.properties && feature.properties.name) {
                            layer.bindPopup(feature.properties.name);
                        }
                    }}/>}
                </FeatureGroup>
            </MapContainer>
            <FigureModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSubmit={addName}/>
        </div>
    );
};
