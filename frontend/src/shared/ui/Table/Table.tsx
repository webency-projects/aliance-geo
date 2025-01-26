import {classNames} from "shared/lib/classNames/classNames";
import { FaGlobeAmericas } from "react-icons/fa";
import cls from './Table.module.scss';
import {Feature, Polygon} from "geojson";
import {Button, ButtonTheme} from "shared/ui/Button/Button.tsx";
import {IoEyeOff, IoEye} from "react-icons/io5";
import {memo, useState} from "react";

interface TableProps {
    className?: string;
    feature: Feature<Polygon>;
    headers: string[];
}

export const Table = (props: TableProps) => {
    const {className, feature, headers} = props;
    const [isActive, setIsActive] = useState(false)
    const title = feature.properties?.name || feature.properties?.intersected_polygon_name || "";
    const is_antimeridian = feature.properties?.antimeridian || false;
    const coordinates = feature.geometry.coordinates.flat() || [];
    return (
        <div className={classNames(cls.Table, {}, [className])}>
            <div className={cls.Polygon}>
                <div className={cls.title}>
                    <FaGlobeAmericas
                        color={is_antimeridian ? "#ff8080" : "#08ad64"}
                        title={is_antimeridian ? "Пересекает антимередиан" : "Не пересекает антимередиан"}/>
                    <h2>{title}</h2>
                </div>
                <Button theme={ButtonTheme.CLEAR} onClick={() => setIsActive(p => !p)}>
                    {isActive ? (
                        <IoEyeOff style={{color: "grey"}} size={25}/>
                    ) : (
                        <IoEye style={{color: "grey"}} size={25}/>
                    )}
                </Button>
            </div>
            {isActive && coordinates.length && (
                <table>
                    <Headers headers={headers}/>
                    <tbody>
                    {
                        coordinates.map((point, index) => (
                            <tr key={index}>
                                <td>{point[0].toFixed(5)}</td>
                                <td>{point[1].toFixed(5)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            )}
        </div>
    );
};

const Headers = memo(({headers}: { headers: string[] }) => {
    return (
        <thead>
        <tr>
            {headers.map((header) =>
                <th key={header}>{header}</th>
            )}
        </tr>
        </thead>
    )
})
