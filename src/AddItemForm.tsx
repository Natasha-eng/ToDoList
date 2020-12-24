import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm');
    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = newTitle.trim();
        if (trimmedTitle !== "") {
            props.addItem(newTitle);
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
            addItem()
        }
    }

    return (
        <div>
            <TextField variant={"outlined"} label={"Type value"} value={newTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler} error={!!error}
                       helperText={error}/>
            <IconButton onClick={addItem} color={"primary"}><ControlPoint/> </IconButton>
        </div>
    )
});

