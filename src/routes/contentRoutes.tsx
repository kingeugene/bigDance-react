import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes/routes";

const renderMergedProps = (Component: React.ComponentType, ...rest: any[]) => {
    const allProps = Object.assign({}, ...rest);
    return <Component {...allProps} />;
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

export const getContentRoutes = (isLogined: boolean): JSX.Element => {
    return (
        <Switch>
            {Object.values(routes).map((route, i) => {
                return route.meta!.requiresAuth ? (
                    <PrivateRoute
                        {...route}
                        authed={isLogined}
                        redirectTo={routes.login.path}
                        key={i}
                    />
                ) : (
                    <BasicRoute {...route} key={i} />
                );
            })}
        </Switch>
    );
};
