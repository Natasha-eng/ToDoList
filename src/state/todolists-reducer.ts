import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddToDoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

type ActionsType = RemoveToDoListActionType | AddToDoListActionType | ChangeToDoListTitleActionType | ChangeToDoListFilterActionType

export const todolistsReducer = (state: Array<ToDoListType>, action: ActionsType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state,
                {
                    id: v1(),
                    title: action.title,
                    filter: 'all'
                }]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }

        default:
            throw new Error("I dont understand this action type")
    }
}

export const RemoveToDoListAC = (todolistId: string): RemoveToDoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddToDoListAC = (todolistTitle: string): AddToDoListActionType => {
    return {type: 'ADD-TODOLIST', title: todolistTitle}
}

export const ChangeToDoListTitleAC = (todolistId: string, todolistTitle: string): ChangeToDoListTitleActionType => {

    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: todolistTitle
    }
}

export const ChangeToDoListFilterAC = (todolistId: string, todolistFilter: FilterValuesType): ChangeToDoListFilterActionType => {

    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId,
        filter:todolistFilter
    }
}