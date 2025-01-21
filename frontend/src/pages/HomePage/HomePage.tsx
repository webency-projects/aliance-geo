import {MapBox} from "widgets/MapBox";
import {useState} from "react";
import {Layer} from "leaflet";


export const HomePage = () => {
    const [features, setFeatures] = useState<Layer[]>([])
    return (
        <div className='container_page'>
            <MapBox features={features} setFeatures={setFeatures} />
        </div>
    );
};
