import {HomePage} from "pages/HomePage/HomePage.tsx";
import {ErrorBoundary} from "shared/ui/ErrorBoundary/ErrorBoudary.tsx";
import {ErrorPage} from "pages/ErrorPage/ErrorPage.tsx";


function App() {

    return (
        <>
            <ErrorBoundary fallback={ErrorPage}>
                <HomePage/>
            </ErrorBoundary>
        </>
    )
}

export default App
