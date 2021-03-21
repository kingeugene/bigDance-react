import "./style/index.scss";

import { Provider } from "mobx-react";
import React from "react";
import { Route, Router, Switch } from "react-router";

import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import RootStore, { history } from "./store/RootStore";

const store = {
    rootStore: RootStore,
};

const App = (): JSX.Element => (
    <Provider {...store}>
        <Router history={history}>
            <Switch>
                <Route path="/" component={WelcomePage} />
            </Switch>
        </Router>
    </Provider>
);
export default App;
