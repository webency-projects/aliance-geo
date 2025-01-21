import cls from './Input.module.scss';
import {ChangeEvent, InputHTMLAttributes, useEffect, useRef} from "react";
import {classNames} from 'shared/lib/classNames/classNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps{
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readOnly?: boolean;
}

export const Input = (props:InputProps) => {
    const {
        className = '',
        value,
        onChange,
        type = 'text',
        autofocus,
        readOnly,
        ...other
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };


    return (
        <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            readOnly={readOnly}
            className={classNames(cls.Input, {}, [className])}
            {...other}
        />
    );
};
