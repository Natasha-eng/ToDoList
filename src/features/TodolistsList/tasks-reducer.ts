import {
    AddTodolistActionType,
    RemoveTodolistActionType, SetTodolistActionType,
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../stories/utils/error-utils";

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};

        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};

        case 'UPDATE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        }

        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }

        case 'REMOVE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;

        case 'SET_TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            });
            return stateCopy
        }

        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};

        default:
            return state;
    }
}


//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', taskId, model, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}


//thunks
export const fetchTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskThunkCreator = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType | setAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => (dispatch: ThunkDispatch, getState: () => AppRootState) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
        console.warn('task not found in the state');
        return;
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof setTasksAC> |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistActionType

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | setAppErrorActionType>