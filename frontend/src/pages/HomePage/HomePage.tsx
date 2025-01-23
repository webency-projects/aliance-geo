import {MapBox} from "widgets/MapBox";
import {Sidebar} from "widgets/Sidebar";


export const HomePage = () => {
    return (
        <div className='container_page'>
            <MapBox />
            <Sidebar/>
        </div>
    );
};
