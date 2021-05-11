import React from "react";
import {FilterValuesType} from "../App";
import {Button} from "@material-ui/core";

type ButtonFilterType = {
    title:string
    filter: FilterValuesType
    onClickHandler: () => void
}

export const ButtonFilter: React.FC<ButtonFilterType> = (props) => {
    return(
        <div>
            <Button variant={props.filter === props.title ? "contained" : "outlined"}
                    onClick={props.onClickHandler}
                    color={"primary"}>{props.title}</Button>
        </div>
    )
}
