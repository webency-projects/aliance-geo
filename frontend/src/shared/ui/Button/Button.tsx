import {classNames} from 'shared/lib/classNames/classNames';
import {ButtonHTMLAttributes, memo, ReactNode} from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    PRIMARY = 'primary',
    SUCCESS = 'success',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
    theme?: ButtonTheme
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        disabled = false,
        theme = ButtonTheme.SUCCESS,
        ...others
    } = props;
    return (
        <button
            className={classNames(cls.Button, {[cls.disable]: disabled}, [className, cls[theme]])}
            disabled={disabled}
            {...others}
        >
            {children}
        </button>
    );
});
