import React, { ReactNode } from "react";

export type BaseButtonProps = {
    id?: string;
    theme?: "contained" | "outlined";
    color?: "primary" | "secondary" | "gray" | "inherit";
    size?: "small" | "medium" | "big" | "large";
    type?: "submit" | "button";
    loading?: boolean;
    disabled?: boolean;
    click?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    extraClassName?: string;
    children?: ReactNode;
};
