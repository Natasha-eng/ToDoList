import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskStateType} from "./AppWithRedux";

type PropsType = {
    id: string
    title: string
    changeFilter: (newValue: FilterValuesType, todoListID: string) => void
    filter: FilterValuesType
    removeToDoList: (todoListID: string) => void
    changeToDoListTitle: (todoListID: string, newTitle: string) => void
}

function TodoList(props: PropsType) {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);

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

    const changeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }

    let tasksForToDoList = tasks
    if (props.filter === "active") {
        tasksForToDoList = tasks.filter(task => task.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForToDoList = tasks.filter(task => task.isDone === true)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/>
                <IconButton onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title)=> {
                dispatch(addTaskAC(title, props.id))
            }}/>
            <div>
                {
                    tasksForToDoList.map(task => {
                        const onRemoveHandler = () => dispatch(removeTaskAC(task.id, props.id))
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.id));
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(task.id, newValue, props.id));
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

