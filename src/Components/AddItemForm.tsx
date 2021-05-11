import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField, Tooltip} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = (props) => {
    let [titleInput, setTitleInput] = useState("");
    let [error,setError] = useState<string | null>(null);

    const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value);
    }
    const onKeyPressItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            add();
        }
    }
    const add = () => {
        if (titleInput === "") {
            setError("Title is required!");
            return;
        }
        if (titleInput.trim() === "") {
            setTitleInput("");
            setError("Title is required!");
            return;
        }
        props.addItem(titleInput.trim(),)
        setTitleInput("");
    }

    return (
        <div className={"add_item"}>
            <TextField variant={"outlined"}
                       value={titleInput}
                       onChange={onChangeItemHandler}
                       onBlur={() => setError(null)}
                       onKeyPress={onKeyPressItemHandler}
                       error={!!error} label={"Title"}
                       helperText={error}
                       size={'small'}/>
            <IconButton color={"primary"} onClick={add}>
                <AddBox/>
            </IconButton>
        </div>
    )
}


