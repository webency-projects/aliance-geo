import {classNames} from "shared/lib/classNames/classNames";
import {FeatureGroup, GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import {EditControl} from "react-leaflet-draw"
import L, {DrawEvents, LatLngTuple, Layer, type Map} from "leaflet";
import cls from './MapBox.module.scss';
import {useEffect, useRef, useState} from "react";
import {FigureModal} from "features/AddFigureName";


import {useDispatch, useSelector} from "react-redux";
import {getIntersectionData, getMapCenter, getMapData} from "../model/selectors/MapDataSelectors.ts";
import {fetchMapData} from "widgets/MapBox/model/services/fetchMapData.ts";
import {mapActions} from "widgets/MapBox/model/slice/MapBoxSlice.ts";
import {fetchIntersectionData} from "widgets/MapBox/model/services/fetchIntersectionData.ts";


interface MapBoxProps {
    className?: string;
}


export const MapBox = (props: MapBoxProps) => {
    const {className} = props;
    const dispatch = useDispatch();
    const mapRef = useRef<Map | null>(null);
    const center = useSelector(getMapCenter)

    const geoJsonData = useSelector(getMapData)
    const intersectionData = useSelector(getIntersectionData)

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [currentLayer, setCurrentLayer] = useState<Layer | null>(null)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchMapData())
        // @ts-ignore
        dispatch(fetchIntersectionData())
    }, [dispatch]);

    useEffect(() => {
        const map = mapRef?.current;
        if (map && center && center?.length > 0) {
            const coords = center.map((coord) => [coord[1], coord[0]]) as LatLngTuple[];
            const bounds = L.latLngBounds(coords)
            map.fitBounds(bounds)
        }
    }, [center]);


    const onCreated = async (e: DrawEvents.Created) => {
        const {layer, layerType} = e;
        if (layerType === "polygon") {
            setCurrentLayer(layer)
            dispatch(mapActions.setCurrentFeature(layer.toGeoJSON()))
            setIsOpenModal(true)
        }
    }
    const onEdited = (e: DrawEvents.Edited) => {
        const {layers} = e;
        layers.eachLayer(layer => {
            setCurrentLayer(layer)
            // @ts-ignore
            dispatch(mapActions.editCurrentFeature(layer.toGeoJSON()))
        })

    }
    const onDeleted = () => {
        setCurrentLayer(null)
        dispatch(mapActions.deleteCurrentFeature())
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
                center={[22.85720, 47.63672]}
                zoom={13}
                style={{height: '100vh', width: '100%'}}
                ref={mapRef}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <FeatureGroup>
                    <EditControl
                        position={"topleft"}
                        onCreated={onCreated}
                        onEdited={onEdited}
                        onDeleted={onDeleted}
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
                {Object.keys(geoJsonData).length && <GeoJSON data={geoJsonData} onEachFeature={(feature, layer) => {
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(feature.properties.name);
                    }}}/>
                }
                {Object.keys(intersectionData).length && <GeoJSON data={intersectionData} style={{color: "red"}} onEachFeature={(feature, layer) => {
                    if (feature.properties && feature.properties.intersected_polygon_name) {
                        layer.bindPopup(feature.properties.intersected_polygon_name);
                    }}}/>
                }
            </MapContainer>
            <FigureModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSubmit={addName}/>
        </div>
    );
};

