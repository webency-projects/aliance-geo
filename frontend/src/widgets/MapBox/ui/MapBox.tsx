import {classNames} from "shared/lib/classNames/classNames";
import {MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import {EditControl} from "react-leaflet-draw"
import {LatLngTuple} from "leaflet";

import cls from './MapBox.module.scss';


const START_POSITION: LatLngTuple = [51.505, -0.09]

interface MapBoxProps {
    className?: string;
}

export const MapBox = (props: MapBoxProps) => {
    const {className = ""} = props;

    const createdHandler = () => {}
    const editedHandler = () => {}
    const deletedHandler = () => {}
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
        </div>
    );
};
