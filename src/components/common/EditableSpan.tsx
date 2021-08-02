import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';
import {EditableSpanType} from '../../redux/types/Types';


export const EditableSpan:React.FC<EditableSpanType> = React.memo(props => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false);
        props.changeTitle(title)
    }

    if (props.type === 'priority') {
        return (
            editMode
                ? <TextField label={'Priority'}
                             type={'number'}
                             value={title}
                             onChange={onChangeTitle}
                             onBlur={offEditMode} autoFocus/>
                : <span onDoubleClick={onEditMode}>{props.title}</span>
        );
    }
    return (
        editMode
            ? <TextField variant={'standard'}
                         value={title}
                         onChange={onChangeTitle}
                         onBlur={offEditMode} autoFocus/>
            : <span onDoubleClick={onEditMode} onClick={props.click}>{props.title}</span>
    );
})

