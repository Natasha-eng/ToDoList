import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeToDoList: (todoListID: string) => void
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

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeToDoList(props.id)}>Delete</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                              onChange={onChangeHandler}
                                                                                              checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler}>X
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter == "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter == "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter == "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;