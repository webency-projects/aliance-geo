import {classNames} from 'shared/lib/classNames/classNames';
import {memo, useEffect, useState} from 'react';
import cls from './FigureForm.module.scss';
import {Input} from "shared/ui/Input/Input.tsx";
import {Button} from "shared/ui/Button/Button.tsx";

interface FigureFormProps {
    className?: string;
    onSubmit: (value: string) => void;
    onClose: () => void;
}

export const FigureForm = memo((props: FigureFormProps) => {
    const {className, onClose, onSubmit} = props;
    const [figureName, setFigureName] = useState("")
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        if (figureName.length > 1) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [figureName]);
    const handleClick = () => {
        onSubmit(figureName)
        setFigureName("")
        setDisabled(true)
        onClose()
    }
    return (
        <div className={classNames(cls.FigureForm, {}, [className])}>
            <h2>Название полигона</h2>
            <div className={cls.separator}></div>
            <Input value={figureName} onChange={setFigureName} autofocus/>
            <Button onClick={handleClick} disabled={disabled}>Добавить</Button>
        </div>
    );
});
