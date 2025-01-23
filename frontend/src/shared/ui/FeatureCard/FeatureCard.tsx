import {classNames} from "shared/lib/classNames/classNames";

import cls from './FeatureCard.module.scss';
import {Button} from "shared/ui/Button/Button.tsx";
import {Feature, Polygon} from "geojson";

interface FeatureCardProps {
    className?: string;
    feature: Feature<Polygon>;
    onSave: () => void;
}

export const FeatureCard = (props: FeatureCardProps) => {
    const {
        className,
        feature,
        onSave
    } = props;
    if (!feature) {
        return (
            <div className={classNames(cls.FeatureCard, {}, [className])}>
                <h2>Нет данных</h2>
            </div>
        );
    }
    const title = feature.properties?.name || "";
    const {coordinates} = feature.geometry;
    return (
        <div className={classNames(cls.FeatureCard, {}, [className])}>
            <h2>{title}</h2>

            <table>
                <thead>
                <tr>
                    <th>Широта</th>
                    <th>Долгота</th>
                </tr>
                </thead>
                <tbody>
                {coordinates.map((line) => (
                    line.map((point, index) => (
                        <tr key={index}>
                            <td>{point[0].toFixed(5)}</td>
                            <td>{point[1].toFixed(5)}</td>
                        </tr>
                    ))
                ))}
                </tbody>
            </table>

            <Button onClick={onSave}>Сохранить</Button>
        </div>
    );
};
