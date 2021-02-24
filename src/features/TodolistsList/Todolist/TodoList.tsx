import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {addTaskTC, fetchTasksThunkCreator} from "../tasks-reducer";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";

type PropsType = {
    todolist: TodolistDomainType
    changeFilter: (newValue: FilterValuesType, todoListID: string) => void
    removeToDoList: (todoListID: string) => void
    changeToDoListTitle: (todoListID: string, newTitle: string) => void
    demo?: boolean
}

export const TodoList: React.FC<PropsType> = React.memo(({demo = false, ...props}: PropsType) => {
    console.log('TodoList called')

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksThunkCreator(props.todolist.id))
    }, []);

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolist.id]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, props.todolist.id))
    }, [dispatch, props.todolist.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);

    const removeToDoList = useCallback(() => {
        props.removeToDoList(props.todolist.id);
    }, [props.removeToDoList, props.todolist.id])

    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToDoListTitle(props.todolist.id, newTitle)
    }, [props.changeToDoListTitle, props.todolist.id])

    let tasksForToDoList = tasks
    if (props.todolist.filter === "active") {
        tasksForToDoList = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForToDoList = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeToDoListTitle}/>
                <IconButton onClick={removeToDoList} disabled = {props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled = {props.todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForToDoList.map(task => <Task
                        task={task} toDoListId={props.todolist.id}
                        key={task.id}
                    />)
                }
            </div>
            <div>
                <Button size={"small"} variant={props.todolist.filter === "all" ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button size={"small"} color={"primary"} variant={props.todolist.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button size={"small"} color={"secondary"} variant={props.todolist.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
});

