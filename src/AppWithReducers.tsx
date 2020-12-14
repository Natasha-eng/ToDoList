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


function AppWithReducers() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "Dog", isDone: true},
            {id: v1(), title: "Cat", isDone: true},
            {id: v1(), title: "Horse", isDone: false},
            {id: v1(), title: "Rabbit", isDone: true},
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasksReducer(removeTaskAC(taskID,todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasksReducer(addTaskAC(title,todoListID));
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const action = changeToDoListFilterAC(todoListID,newFilterValue);
        dispatchToTodolistsReducer(action);
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskID, isDone,todoListID));
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, newTitle,todoListID);
        dispatchToTasksReducer(action);
    }

    function removeToDoList(todoListID: string) {
        const action = removeToDoListAC(todoListID);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    }

    function changeToDoListTitle(todoListID: string, newTitle: string) {
        const action = changeToDoListTitleAC(todoListID, newTitle);
        dispatchToTodolistsReducer(action);
    }

    function addToDoList(title: string) {
        const action = addToDoListAC(title);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
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
                        let tasksForToDoList = tasks[tl.id]
                        if (tl.filter === "active") {
                            tasksForToDoList = tasks[tl.id].filter(task => task.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksForToDoList = tasks[tl.id].filter(task => task.isDone === true)
                        }
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

export default AppWithReducers;
