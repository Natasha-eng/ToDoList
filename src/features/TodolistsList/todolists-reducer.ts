import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../stories/utils/error-utils";

const initialState: Array<TodolistDomainType> = [];

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);

        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state];

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);

        case 'CHANGE_TODOLIST_ENTITY_STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl);
        }

        case 'SET_TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}));

        default:
            return state;
    }
}

//actions
export const removeToDoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id}) as const
export const addToDoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeToDoListTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
}) as const
export const changeToDoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
}) as const
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists}) as const
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE_TODOLIST_ENTITY_STATUS',
    id,
    status
}) as const

//thunks
export const fetchTodolistsThunkCreator = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))

    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeToDoListAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addToDoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const changeTodolistTitleTC = (todoListID: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(todoListID, title)
        .then((res) => {
            dispatch(changeToDoListTitleAC(todoListID, title))
        })
}

//types
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeToDoListTitleAC>
    | ReturnType<typeof changeToDoListFilterAC>
    | SetTodolistActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type AddTodolistActionType = ReturnType<typeof addToDoListAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeToDoListAC>;
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | setAppErrorActionType>
