import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    titleP: string
    changeTitleP: (newTitle:string) => void
};

export const EditableSpan = React.memo( (props:EditableSpanType) => {
    const {titleP,changeTitleP} = props;
    console.log("EditableSpan is called")
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState(titleP);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false);
        changeTitleP(title)
    }

    return (
        editMode
            ?<TextField variant={"standard"} value={title} onChange={onChangeTitle} onBlur={offEditMode} autoFocus/>
            : <span onDoubleClick={onEditMode}>{titleP}</span>
    );
})

