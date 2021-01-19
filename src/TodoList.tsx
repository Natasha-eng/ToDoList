import React, {useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolists-reducer";

type PropsType = {
    id: string
    title: string
    changeFilter: (newValue: FilterValuesType, todoListID: string) => void
    filter: FilterValuesType
    removeToDoList: (todoListID: string) => void
    changeToDoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList: React.FC<PropsType> = React.memo((props: PropsType) => {
    console.log('TodoList called')

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);

    const removeToDoList = useCallback(() => {
        props.removeToDoList(props.id);
    }, [props.removeToDoList, props.id])

    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }, [props.changeToDoListTitle, props.id])

    let tasksForToDoList = tasks
    if (props.filter === "active") {
        tasksForToDoList = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForToDoList = tasks.filter(task => task.status === TaskStatuses.Completed)
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
                    tasksForToDoList.map(task => <Task
                        task={task} toDoListId={props.id}
                        key={task.id}
                    />)
                }
            </div>
            <div>
                <Button size={"small"} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button size={"small"} color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button size={"small"} color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
});

