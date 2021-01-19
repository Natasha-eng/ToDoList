import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addToDoListAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC, FilterValuesType,
    removeToDoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: '',
    order: 0},
        {id: todoListID2, title: "What to buy", filter: "all", addedDate: '',
        order: 0}
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''},
            {id: v1(), title: "ReactJS", status: TaskStatuses.Completed,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''},
            {id: v1(), title: "Redux", status: TaskStatuses.Completed,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''}
        ],
        [todoListID2]: [
            {id: v1(), title: "Dog", status: TaskStatuses.Completed,
                todoListId: todoListID2, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''},
            {id: v1(), title: "Cat", status: TaskStatuses.Completed,
                todoListId: todoListID2, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''}
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

    function changeStatus(taskID: string, status: TaskStatuses, todoListID: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskID, status,todoListID));
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
                            tasksForToDoList = tasks[tl.id].filter(task => task.status === TaskStatuses.New)
                        }
                        if (tl.filter === "completed") {
                            tasksForToDoList = tasks[tl.id].filter(task => task.status === TaskStatuses.Completed)
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
