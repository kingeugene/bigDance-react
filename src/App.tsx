import "style/index.scss";

import MainLayout from "Components/Layout/MainLayout/MainLayout";
import { StoreProvider } from "Providers/RootStoreProvider";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const App = (): JSX.Element => (
    <StoreProvider>
        <Router>
            <MainLayout />
        </Router>
    </StoreProvider>
);
export default App;
