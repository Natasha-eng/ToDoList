import {FilterValuesType, ToDoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddToDoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeToDoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeToDoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType

export let todoListID1 = v1()
export let todoListID2 = v1()

const initialState: Array<ToDoListType> = [
    {id: todoListID1, title: "What to learn", filter: "all"},
    {id: todoListID2, title: "What to buy", filter: "all"},
]

export const todoListsReducer = (state: Array<ToDoListType> = initialState, action: ActionsType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state
            ]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
                return [...state]
            }
            return state
        }
        default:
            return state;
    }
}

export const removeToDoListAC = (todolistId: string): RemoveToDoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addToDoListAC = (todolistTitle: string): AddToDoListActionType => {
    return {type: 'ADD-TODOLIST', title: todolistTitle, todolistId: v1()}
}

export const changeToDoListTitleAC = (todolistId: string, todolistTitle: string): ChangeToDoListTitleActionType => {

    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: todolistTitle
    }
}

export const changeToDoListFilterAC = (todolistId: string, todolistFilter: FilterValuesType): ChangeToDoListFilterActionType => {

    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId,
        filter: todolistFilter
    }
}