import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "2dd445e0-b7d4-4bbf-a3e6-2f0f9111bbe9"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.createTodolist('Natasha todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '692528f1-09fd-45d3-a143-0ae67d973a13';
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'a55248e6-2f9a-4d4c-a13a-d50e76da06db';
        todolistsAPI.updateTodolist(todolistId, 'Natasha')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('')

    /*useEffect(() => {
        const todolistId = '50f0175f-4a6a-45e4-a500-1103e190f252';
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, []);*/

    const getTasks = () => {
        const todolistId = '50f0175f-4a6a-45e4-a500-1103e190f252';
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    /*useEffect(() => {
        const todolistId = '50f0175f-4a6a-45e4-a500-1103e190f252';
        const taskId = "";
        todolistsAPI.deleteTask(todolistId,taskId )
            .then((res) => {
                setState(res.data);
            })

    }, [])*/

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>Delete Task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    /*useEffect(() => {
        const todolistId = '50f0175f-4a6a-45e4-a500-1103e190f252';
        const taskId = "";
        todolistsAPI.deleteTask(todolistId,taskId )
            .then((res) => {
                setState(res.data);
            })

    }, [])*/

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'task Title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('Title 1')
    const [taskDescription, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: '',
            description: taskDescription,
            priority: priority,
            startDate: '',
            status: status,
            title: taskTitle
        })
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>

            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>

            <input placeholder={'taskTitle'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>

            <input placeholder={'taskDescription'} value={taskDescription} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>

            <input placeholder={'status'} type="number" value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>

            <input placeholder={'priority'} type="number" value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>

            <button onClick={updateTask}>update Task</button>
        </div>
    </div>
}

