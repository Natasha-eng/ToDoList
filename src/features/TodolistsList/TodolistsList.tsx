import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodolistTC,
    changeToDoListFilterAC, changeTodolistTitleTC,
    fetchTodolistsThunkCreator,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/TodoList";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists);
    //const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsThunkCreator())
    }, []);


    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        const action = changeToDoListFilterAC(todoListID, newFilterValue);
        dispatch(action);
    }, [dispatch])

    const removeToDoList = useCallback((todoListID: string) => {
        const action = removeTodolistTC(todoListID);
        dispatch(action);
    }, [dispatch])

    const changeToDoListTitle = useCallback((todoListID: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(todoListID, newTitle);
        dispatch(thunk);
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        const action = addTodolistTC(title);
        dispatch(action);
    }, [dispatch])

    /*let tasksForToDoList = tasks
    if (filter === "active") {
        tasksForToDoList = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter(task => task.isDone === true)
    }
*/

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return <>
        <Grid container style={{padding: "10px"}}>
            <AddItemForm addItem={addToDoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todoLists.map(tl => {

                return (
                    <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <TodoList todolist={tl}
                                      changeFilter={changeFilter}
                                      removeToDoList={removeToDoList}
                                      changeToDoListTitle={changeToDoListTitle} demo={demo}/>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    </>
}