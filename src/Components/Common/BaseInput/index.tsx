import "./styles.scss";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React from "react";

import { BaseInputProps } from "./types";

const BaseInput: React.FC = () => {
    const [name, setName] = React.useState("Composed TextField");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <div className="BaseInput">
            <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    value={name}
                    onChange={handleChange}
                    label="Name"
                    aria-describedby="component-error-text"
                />
            </FormControl>
            <FormHelperText id="component-error-text">Error</FormHelperText>
        </div>
    );
};

export default BaseInput;
