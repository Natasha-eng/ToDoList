import React from "react";
import {Provider} from 'react-redux';
import {AppRootState, store} from './app/store';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./features/TodolistsList/tasks-reducer";
import {v1} from "uuid";
import {todoListsReducer} from "./features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";
import thunk from "redux-thunk";
import {appReducer} from "./app/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {
            id: "todolistId1", title: "What to learn", filter: "all", addedDate: '',
            order: 0, entityStatus: "idle"
        },
        {
            id: "todolistId2", title: "What to buy", filter: "all", addedDate: '',
            order: 0, entityStatus: "loading"
        }
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: 'todoListID1', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: 'todoListID1', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: 'todoListID2', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todoListId: 'todoListID2', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            }
        ]
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>)