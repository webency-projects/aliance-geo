import {MapBox} from "widgets/MapBox";
import {FeatureCard} from "shared/ui/FeatureCard/FeatureCard.tsx";

export const HomePage = () => {

    return (
        <div className='container_page'>
            <MapBox />
            <FeatureCard name={"Полигон"} coordinates={[[123,133], [124, 53], [234, 414.21]]}/>
        </div>
    );
};
