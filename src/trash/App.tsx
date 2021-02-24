import React, {useState} from 'react';
import '../app/App.css';
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../features/TodolistsList/todolists-reducer";



export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: todoListID2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [

            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low,
                description: '' },

            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {id: v1(), title: "ReactJS", status: TaskStatuses.New,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {id: v1(), title: "Redux", status: TaskStatuses.Completed,
                todoListId: todoListID1, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
        ],
        [todoListID2]: [
            {id: v1(), title: "React", status: TaskStatuses.Completed,
                todoListId: todoListID2, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {id: v1(), title: "Redux", status: TaskStatuses.Completed,
                todoListId: todoListID2, startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            }
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title,status: TaskStatuses.New,
            todoListId: todoListID, startDate: '', deadline: '',
            addedDate: '', order: 0, priority: TaskPriorities.High,
            description: '' };
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks});
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskID: string, status:TaskStatuses , todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.status = status;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    function removeToDoList(todoListID: string) {
        const filteredToDoLists = todoLists.filter(tl => tl.id != todoListID)
        setTodoLists(filteredToDoLists)
        delete tasks[todoListID]
        setTasks(({...tasks}))
    }

    function changeToDoListTitle(todoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    function addToDoList(title: string) {
        let todoList: TodolistDomainType = {
            id: v1(),
            filter: "all",
            title: title,
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
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
                                   {/* <TodoList key={tl.id} id={tl.id} title={tl.title}
                                              changeFilter={changeFilter}
                                              filter={tl.filter} removeToDoList={removeToDoList}
                                              changeToDoListTitle={changeToDoListTitle}/>*/}
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}


