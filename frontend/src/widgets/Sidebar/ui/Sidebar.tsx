import {classNames} from 'shared/lib/classNames/classNames';
import {memo} from 'react';
import cls from './Sidebar.module.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {FeatureCard} from "shared/ui/FeatureCard/FeatureCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentFeature, getMapData} from "widgets/MapBox/model/selectors/MapDataSelectors.ts";
import {addMapData} from "widgets/MapBox/model/services/addMapData.ts";
import {Table} from "shared/ui/Table/Table.tsx";

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {className = ''} = props;
    const feature = useSelector(getCurrentFeature)
    const data = useSelector(getMapData)
    const dispatch = useDispatch()
    const handleSave = () => {
        dispatch(addMapData())
    }
    return (
        <div className={classNames(cls.Sidebar, {}, [className])}>
            <Tabs>
                <TabList>
                    <Tab>Текущий</Tab>
                    <Tab>Полигоны</Tab>
                    <Tab>Пересечения</Tab>
                </TabList>

                <TabPanel>
                    <FeatureCard feature={feature} onSave={handleSave}/>
                </TabPanel>
                <TabPanel>
                    {Object.keys(data).length && data?.features.map(f => (
                        <Table key={f.id} feature={f} headers={["Долгота", "Широта"]}/>
                    ))}
                </TabPanel>
                <TabPanel>
                    <h2>Any content 3</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
});
