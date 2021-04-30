import React from "react";

interface IRoute {
    name: string;
    path: string;
    component: React.FC;
    exact?: boolean;
    meta: {
        title?: string;
        requiresAuth: boolean;
        requiresAdmin?: boolean;
    };
}

export type IRoutesType = Record<RoutesNameType, IRoute>;
