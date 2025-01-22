import {classNames} from "shared/lib/classNames/classNames";

import cls from './FeatureCard.module.scss';
import {memo} from "react";
import {Button} from "shared/ui/Button/Button.tsx";

interface FeatureCardProps {
    className?: string;
    feature: any;
    onSave: () => void;
}

export const FeatureCard = (props: FeatureCardProps) => {
    const {
        className,
        feature,
        onSave
    } = props;
    const geoJsonFeature = feature.toGeoJSON();
    const {coordinates} = geoJsonFeature.geometry;
    const title = geoJsonFeature.properties.title;

    return (
        <div className={classNames(cls.FeatureCard, {}, [className])}>
            <h2>{title}</h2>

            <table>
                <thead>
                <tr>
                    <th>Ширина</th>
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
