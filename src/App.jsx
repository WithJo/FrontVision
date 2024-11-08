import { Suspense, lazy } from "react";

import { ThemeProvider } from "@emotion/react";
import { Route, Routes } from "react-router-dom";

import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

// Lazy loading components
const Home = lazy(() => import("./pages/Home/Home"));
const Music = lazy(() => import("./pages/Music/Music"));
const NotFound = lazy(() => import("./pages/Error/NotFound"));
const Loading = lazy(() => import("./components/Loading"));

function App() {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Music" element={<Music />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </ThemeProvider>
        </>
    );
}

export default App;
