import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {addTodolistTC} from '../../redux/reducers/TodoListReducers';
import {useDispatch} from 'react-redux';
import {AddItemFormType} from '../../redux/types/Types';


export const AddItemForm:React.FC<AddItemFormType> = React.memo (props => {

    let [titleInput, setTitleInput] = useState("");
    let [error,setError] = useState<string | null>(null);

    const onChangeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value);
    }
    const onKeyPressItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if  (error !== null) {
            setError(null);
        }
        if (e.key === "Enter"){
            addForm();
        }
    }

    const addForm = () => {
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
            <IconButton color={"primary"} onClick={addForm}>
                <AddBox/>
            </IconButton>
        </div>
    )
})


export const AddItemFormContainer = () => {
    const dispatch = useDispatch();

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    return (
        <AddItemForm addItem={addTodoList}/>
    )
}



