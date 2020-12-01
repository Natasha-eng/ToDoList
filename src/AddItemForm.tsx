import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTask = () => {
        const trimmedTitle = newTaskTitle.trim();
        if (trimmedTitle !== "") {
            props.addItem(newTaskTitle);
        } else {
            setError("Title is required");
        }
        setNewTaskTitle("");
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <TextField variant={"outlined"} label={"Type value"} value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler} error={!!error}
                       helperText={error}/>
            <IconButton onClick={addTask} color={"primary"}><ControlPoint/> </IconButton>
        </div>
    )
}

export default AddItemForm;