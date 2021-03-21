import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { routes } from "./routes";

export const getContentRoutes = function () {
    return (
        <Switch>
            {Object.values(routes).map((route, i) =>
                routes.meta!.requiresAuth ? (
                    <PrivateRoute
                        {...route}
                        authed={window.LOGINED}
                        redirectTo="/login"
                        key={i}
                    />
                ) : (
                    <BasicRoute {...route} key={i} />
                )
            )}
        </Switch>
    );
};

const BasicRoute = ({ component, ...rest }: any) => {
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return renderMergedProps(component, routeProps, rest);
            }}
        />
    );
};

const PrivateRoute = ({
    component,
    authed = false,
    redirectTo,
    ...rest
}: any) => {
    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return authed ? (
                    renderMergedProps(component, routeProps, rest)
                ) : (
                    <Redirect
                        to={{
                            pathname: redirectTo,
                            state: { from: routeProps.location },
                        }}
                    />
                );
            }}
        />
    );
};

const renderMergedProps = (Component: React.ComponentType, ...rest: any[]) => {
    const allProps = Object.assign({}, ...rest);
    return <Component {...allProps} />;
};
