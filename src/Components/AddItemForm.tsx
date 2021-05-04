import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        if (titleInput === "") return;
        if (titleInput.trim() === "") {
            setTitleInput("");
            setError("Title is required!");
            return;
        }
        props.addItem(titleInput.trim(),)
        setTitleInput("");
    }

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={titleInput}
                   onChange={onChangeItemHandler}
                   onKeyPress={onKeyPressItemHandler}
                   onClick={() => setError(null)}
            />
            <button onClick={add}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}