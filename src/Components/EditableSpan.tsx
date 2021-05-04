import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle:string) => void
};

export const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState(props.title);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false);
        props.changeTitle(title)
    }

    return (
        editMode
            ? <input value={title}
                     autoFocus
                     onChange={onChangeTitle}
                     onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}

