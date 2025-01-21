import {classNames} from 'shared/lib/classNames/classNames';
import {memo} from 'react';
import {Modal} from "shared/ui/Modal/Modal.tsx";
import {FigureForm} from "../FigureForm/FigureForm.tsx";

interface FigureModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
}

export const FigureModal = memo((props: FigureModalProps) => {
    const {className, isOpen, onClose, onSubmit} = props;
    return (
        <Modal
            className={classNames("", {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <FigureForm onSubmit={onSubmit} onClose={onClose} />
        </Modal>
    );
});
