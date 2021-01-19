import React, {useCallback} from 'react';
import './App.css';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoListAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC, FilterValuesType,
    removeToDoListAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {AddItemForm} from "./AddItemForm";
import {TodoList} from "./TodoList";
import {TaskType} from "./api/todolists-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todoLists);
   //const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)


    const changeFilter = useCallback( (newFilterValue: FilterValuesType, todoListID: string) => {
        const action = changeToDoListFilterAC(todoListID, newFilterValue);
        dispatch(action);
    }, [dispatch])

    const removeToDoList = useCallback( (todoListID: string) => {
        const action = removeToDoListAC(todoListID);
        dispatch(action);
    }, [dispatch])

    const changeToDoListTitle = useCallback( (todoListID: string, newTitle: string) => {
        const action = changeToDoListTitleAC(todoListID, newTitle);
        dispatch(action);
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        const action = addToDoListAC(title);
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
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {

                        return (
                            <Grid item  key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList id={tl.id} title={tl.title}
                                              changeFilter={changeFilter}
                                              filter={tl.filter} removeToDoList={removeToDoList}
                                              changeToDoListTitle={changeToDoListTitle} />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
