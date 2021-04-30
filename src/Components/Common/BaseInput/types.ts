export type BaseInputProps = {
    name: string;
    formKey: string;
    storeKey: string;
    label?: string;
    type?: "text" | "submit" | "password";
    disabled?: boolean;
    readOnly?: boolean;
    noValidate?: boolean;
    extraClassName?: string;
};
