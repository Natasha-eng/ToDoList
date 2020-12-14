import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch} from "react-redux";

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


function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()



    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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

    /*const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
        {id: v1(), title: "Sass", isDone: true}
    ]);
*/

    /*  const [filter, setFilter] = useState<FilterValuesType>("all")*/

    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID)
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
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

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone;
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
        let todoList: ToDoListType = {
            id: v1(),
            filter: "all",
            title: title
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

export default App;
