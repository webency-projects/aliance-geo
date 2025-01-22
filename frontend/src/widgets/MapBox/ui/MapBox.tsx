import {classNames} from "shared/lib/classNames/classNames";
import {MapContainer, TileLayer, FeatureGroup, Polygon} from "react-leaflet";
import {EditControl} from "react-leaflet-draw"
import {LatLngTuple, DrawEvents, Layer, Map, geoJSON} from "leaflet";
import {v4 as uuidv4} from 'uuid';
import cls from './MapBox.module.scss';
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {FigureModal} from "features/AddFigureName";
import {FeatureCard} from "shared/ui/FeatureCard/FeatureCard.tsx";
import {Button} from "shared/ui/Button/Button.tsx";
import {jakarta} from "./data";

const START_POSITION: LatLngTuple = [-6.165132, 106.377869]

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
    const [geoJSONLayer, setGeoJSONLayer] = useState(null)
    const [polyes, setPolyes] = useState(() => init_data)
    const [coordinates1, setCoordinates1] = useState([])
    const mapRef = useRef<Map | null>(null);
    useEffect(() => {
        setCoordinates1(jakarta.map(row => [row[1], row[0]]))
    }, []);
    const onCreated = (e: DrawEvents.Created) => {
        const {layer, layerType} = e;
        if (layerType === "polygon") {
            const polygon = {
                id: uuidv4(),
                type: "Feature",
                geometry: layer.toGeoJSON().geometry,
            }
            setPolyes(prev => [...prev, polygon])
        }
    }

    const onEdited = (e: DrawEvents.Edited) => {
        const {layers} = e;
        layers.eachLayer(layer => {
            const polygonId = layer.options.id;
            console.log(polygonId)
            console.log("fjoweiefjweoifjweoifwjef")
            if (layer instanceof Layer) {
                const polygon = {
                    type: "Feature",
                    geometry: layer.toGeoJSON().geometry,
                }
            }
        })
    }
    const onDeleted = (e: DrawEvents.Deleted) => {
        const {layers} = e;
        console.log("fweofiwjef")
        layers.eachLayer(layer => {
            const polygonId = layer.options.id;
            if (layer instanceof Layer) {
                setPolyes(prev => prev.filter(item => item.id !== polygonId))
            }
        })

    }
    const createdHandler = (e: DrawEvents.Created) => {
        const {layer} = e;
        setCurrentLayer(layer)
        setIsOpenModal(true);
        setFeatures(prev => [...prev, layer])
    }
    const uploadGeoJSON = () => {
        setPolyes([])
        // const newLayer = geoJSON(geoJSONLayer)
        // setGeoJSONLayer(newLayer)
        // newLayer.addTo(mapRef.current!);
        // mapRef.current?.fitBounds(newLayer.getBounds());
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
        currentLayer.bindPopup(value).openPopup()

        setFeatures(prev => prev.map(feat => {
            if (feat._leaflet_id === currentLayer._leaflet_id) {
                if (!feat.feature) feat.feature = {type: 'Feature', properties: {title: value}};
                else feat.feature.properties.text = value
            }
            return feat
        }))
        const curGeoJSON = currentLayer.toGeoJSON();

        setGeoJSONLayer(curGeoJSON)
        setIsOpenModal(false)
        setShowInfo(true)
    }


    return (
        <div className={classNames(cls.MapBox, {}, [className])}>
            {coordinates1.length && (
                <MapContainer
                    ref={mapRef}
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

                </MapContainer>
            )}

            <Button
                onClick={uploadGeoJSON}
                style={{zIndex: 600, position: "absolute", left: '50px', top: '50px'}}
            >Загрузить геоданные</Button>
            <FigureModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSubmit={addName}/>
            {showInfo && <FeatureCard feature={currentLayer} onSave={() => setShowInfo(false)}/>}
        </div>
    );
};

const init_data = [
    {
        "id": "be2dc34e-aba7-4608-89c8-b5fd1213b446",
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -114.746704,
                        61.902752
                    ],
                    [
                        -115.125732,
                        61.491249
                    ],
                    [
                        -112.994385,
                        61.407236
                    ],
                    [
                        -112.752686,
                        61.907926
                    ],
                    [
                        -114.746704,
                        61.902752
                    ]
                ]
            ]
        }
    },
    {
        "id": "3a3550b8-8c48-4d37-8ae7-cfa35b031e8c",
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -115.323486,
                        62.044713
                    ],
                    [
                        -116.158447,
                        61.554109
                    ],
                    [
                        -114.922485,
                        61.241174
                    ],
                    [
                        -113.675537,
                        61.564574
                    ],
                    [
                        -113.521729,
                        62.119299
                    ],
                    [
                        -115.323486,
                        62.044713
                    ]
                ]
            ]
        }
    },
    {
        "id": "b5aed0f4-1aa8-48da-be4f-23edfcdf9b90",
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -113.175659,
                        61.731526
                    ],
                    [
                        -113.692017,
                        61.063601
                    ],
                    [
                        -111.956177,
                        60.941106
                    ],
                    [
                        -111.42334,
                        61.551493
                    ],
                    [
                        -112.098999,
                        62.052437
                    ],
                    [
                        -113.175659,
                        61.731526
                    ]
                ]
            ]
        }
    }
]
