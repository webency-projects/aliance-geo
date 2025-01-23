import {MapBox} from "widgets/MapBox";
import {Sidebar} from "widgets/Sidebar";
import {SearchBar} from "widgets/SearchBar/ui/SearchBar.tsx";


export const HomePage = () => {
    return (
        <div className='container_page'>
            <MapBox />
            <Sidebar/>
            <SearchBar/>
        </div>
    );
};
