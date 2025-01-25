import { useEffect } from 'react';
import cls from "./ErrorPage.module.scss"


export function ErrorPage({
                              error,
                              reset,
                          }: {
    error: Error & { digest?: string };
    reset?: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={cls.Error}>
            <h2>Что то пошло не так! </h2>
            <blockquote>
                <code>{error.message}</code>
            </blockquote>
            {reset && <button onClick={() => reset()}>Попробуйте снова!</button>}
        </div>
    );
}
