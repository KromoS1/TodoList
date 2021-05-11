import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle:string) => void
};

export const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState(props.title);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false);
        props.changeTitle(title)
    }

    return (
        editMode
            ?<TextField variant={"standard"} value={title} onChange={onChangeTitle} onBlur={offEditMode} autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}

