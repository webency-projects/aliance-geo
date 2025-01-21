import {classNames} from "shared/lib/classNames/classNames";

import cls from './FeatureCard.module.scss';
import {memo} from "react";
import {Button} from "shared/ui/Button/Button.tsx";

interface FeatureCardProps {
    className?: string;
    type?: 'rectangle' | 'polygon';
    name: string;
    coordinates: [number, number][];
    onSave: () => void;
}

export const FeatureCard = memo((props: FeatureCardProps) => {
    const {
        className,
        type = 'polygon',
        coordinates,
        name,
        onSave
    } = props;
    return (
        <div className={classNames(cls.FeatureCard, {}, [className])}>
            <h2>{name}</h2>
            {type === 'polygon' && (
                <table>
                    <thead>
                    <tr>
                        <th>Ширина</th>
                        <th>Долгота</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coordinates.map((point, i) => (
                        <tr key={i}>
                            <td>{point[0]}</td>
                            <td>{point[1]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Button onClick={onSave}>Сохранить</Button>
        </div>
    );
});
