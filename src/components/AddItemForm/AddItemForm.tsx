import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    console.log('AddItemForm');
    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        const trimmedTitle = newTitle.trim();
        if (trimmedTitle !== "") {
            addItem(newTitle);
            setNewTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField disabled = {disabled} variant={"outlined"} label={"Type value"} value={newTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler} error={!!error}
                       helperText={error}/>
            <IconButton disabled = {disabled} onClick={addItemHandler} color={"primary"}><ControlPoint/></IconButton>
        </div>
    )
});

