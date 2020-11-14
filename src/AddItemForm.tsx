import React, {ChangeEvent, useState, KeyboardEvent} from "react";

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
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler} className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error} </div>}
        </div>
    )
}

export default AddItemForm;