import React from "react";
import {FilterValuesType} from "../AppWithRedux";
import {Button} from "@material-ui/core";

type ButtonFilterType = {
    titleP:string
    filterP: FilterValuesType
    onClickHandlerP: () => void
}

export const ButtonFilter = React.memo( (props:ButtonFilterType) => {
    const {titleP,filterP,onClickHandlerP} = props;
    return(
        <div>
            <Button variant={filterP === titleP ? "contained" : "outlined"}
                    onClick={onClickHandlerP}
                    color={"primary"}>{titleP}</Button>
        </div>
    )
})
