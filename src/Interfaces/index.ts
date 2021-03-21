import { RouteProps } from "react-router";

export interface IRoute extends RouteProps {
    name: string;
    path: string;
    meta?: {
        title?: string;
        requiresAuth?: boolean;
    };
}

export type Hash<T = string> = { [key: string]: T };

export type FetchStatus = "init" | "loading" | "success" | "error";
