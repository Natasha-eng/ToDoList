import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoListAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeToDoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todoLists);


    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const action = changeToDoListFilterAC(todoListID, newFilterValue);
        dispatch(action);
    }



    function removeToDoList(todoListID: string) {
        const action = removeToDoListAC(todoListID);
        dispatch(action);
        dispatch(action);
    }

    function changeToDoListTitle(todoListID: string, newTitle: string) {
        const action = changeToDoListTitleAC(todoListID, newTitle);
        dispatch(action);
    }

    function addToDoList(title: string) {
        const action = addToDoListAC(title);
        dispatch(action);
        dispatch(action);
    }

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
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList key={tl.id} id={tl.id} title={tl.title}
                                              changeFilter={changeFilter}
                                              filter={tl.filter} removeToDoList={removeToDoList}
                                              changeToDoListTitle={changeToDoListTitle}/>
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
