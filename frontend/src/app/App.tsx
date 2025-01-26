import {HomePage} from "pages/HomePage/HomePage.tsx";
import {ErrorBoundary} from "shared/ui/ErrorBoundary/ErrorBoudary.tsx";
import {ErrorPage} from "pages/ErrorPage/ErrorPage.tsx";
import { ToastContainer, toast } from "react-toastify";
import {useSelector} from "react-redux";
import {getMapError} from "widgets/MapBox/model/selectors/MapDataSelectors.ts";
import {useEffect} from "react";

function App() {
    const error =  useSelector(getMapError)
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-right"
            })
        }
    }, [error]);
    return (
        <>
            <ErrorBoundary fallback={ErrorPage}>
                <HomePage/>
                <ToastContainer />
            </ErrorBoundary>
        </>
    )
}

export default App
