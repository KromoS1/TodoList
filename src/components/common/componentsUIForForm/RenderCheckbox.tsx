import {Checkbox, FormControlLabel} from "@material-ui/core";
import React from "react";
import {FormProps} from "redux-form";

interface Props extends FormProps<Props, {}, {}>{
    input:any
    label:string
}

export const RenderCheckbox = ({ input, label }:Props) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                    color={"primary"}
                />
            }
            label={label}
        />
    </div>
)