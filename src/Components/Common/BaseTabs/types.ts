import React from "react";

export interface ITabs {
    label: string;
    value: JSX.Element;
}

export interface BaseTabsProps {
    tabs: ITabs[];
}

export interface TabPanelProps {
    children: React.ReactNode;
    index: any;
    value: any;
}
