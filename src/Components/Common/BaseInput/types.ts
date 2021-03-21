import React from "react";

export type BaseInputProps = {
    name: string;
    label?: string;
    formKey: string;
    storeKey: string;
    type?: string;
    extraClassName?: string;
    additionalButton?: JSX.Element;
    rightAdornment?: JSX.Element;
    theme?: "standard" | "outlined";
    size?: "thin" | "standard" | "large";
    inputRef?: React.Ref<any>;

    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    disablePaste?: boolean;
    showTooltip?: boolean;

    isPassword?: boolean;
    strength?: boolean;

    precision?: number;
    maxLength?: number;
    isNumber?: boolean
    incDec?: boolean;

    trusted?: boolean;
    noValidate?: boolean;

    onBlur?: (field: string, value: string) => any;
    interceptor?: (value: string) => string;
};
