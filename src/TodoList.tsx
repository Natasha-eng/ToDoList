import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    filter: FilterValuesType
    removeToDoList: (todoListID: string) => void
    changeToDoListTitle: (todoListID: string, newTitle: string) => void
}

function TodoList(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    };

    const removeToDoList = () => {
        props.removeToDoList(props.id);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/>
                <IconButton onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }
                        return (
                            <div key={task.id} className={task.isDone ? "is-done" : ""}>
                                <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
                                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button size={"small"} variant={props.filter == "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button size={"small"} color={"primary"} variant={props.filter == "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button size={"small"} color={"secondary"} variant={props.filter == "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;

