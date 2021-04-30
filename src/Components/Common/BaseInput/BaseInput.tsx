import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStore } from "Providers/RootStoreProvider";
import React from "react";

import styles from "./baseInput.module.scss";
import { BaseInputProps } from "./types";

const BaseInput: React.FC<BaseInputProps> = observer(
    ({
        name,
        formKey,
        storeKey,
        label,
        type = "text",
        disabled = false,
        readOnly = false,
        noValidate = false,
        extraClassName,
    }) => {
        const { rootStore } = useStore();
        const store = rootStore[storeKey][formKey];
        const id = formKey + name;

        const handleChange = (field: string) => (
            event: React.ChangeEvent<HTMLInputElement>
        ): void => {
            store.changeField({
                field,
                value: event.target.value.trim(),
            });
        };

        const handleBlur = (): void => {
            store.onBlur({
                field: name,
                noValidate,
            });
        };

        const inputProps = {
            name,
            id,
            type,
            disabled,
            readOnly,
            value: store.getField(name),
            "aria-describedby": `${id}-helper`,
            error: !!store.getError(name),
            onChange: handleChange(name),
            onBlur: handleBlur,
        };

        return (
            <div className={clsx(styles.wrap, extraClassName)}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                        error={!!store.getError(name)}
                        htmlFor={id}
                        variant="outlined"
                    >
                        {label}
                    </InputLabel>
                    <OutlinedInput {...inputProps} />
                </FormControl>
                <FormHelperText
                    id={`${id}-helper`}
                    className={styles.error}
                    error
                >
                    {store.getError(name)}
                </FormHelperText>
            </div>
        );
    }
);

export default BaseInput;
