import React from "react";
import {TextField} from "@material-ui/core";

// interface Props extends FormProps<Props, {}, {}>{
//         value:string
//         placeholder?:string
//         type?:string
// }

export const RenderTextField = ({
                             label,
                             input,
                             meta: {touched, invalid, error},
                             ...custom
                         }:any) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
        variant={"outlined"}
    />
)