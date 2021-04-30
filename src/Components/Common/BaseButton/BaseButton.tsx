import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import React from "react";

import styles from "./baseButton.module.scss";
import { BaseButtonProps } from "./types";

const BaseButton: React.FC<BaseButtonProps> = ({
    id,
    type = "button",
    click,
    loading = false,
    disabled = false,
    color = "primary",
    theme = "contained",
    size = "medium",
    extraClassName,
    children,
}) => {
    const btnClasses = clsx(styles.btn, styles[size], extraClassName);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        if (click) {
            click(event);
        }
    };

    return (
        <Button
            id={id}
            className={btnClasses}
            type={type}
            onClick={(event) => handleClick(event)}
            disabled={loading || disabled}
            color={color === "gray" ? "default" : color}
            variant={theme}
        >
            <div
                className={clsx(styles.content, {
                    invisible: loading,
                })}
            >
                {children}
            </div>
            {loading && (
                <CircularProgress size={20} className={styles.loading} />
            )}
        </Button>
    );
};

export default BaseButton;
