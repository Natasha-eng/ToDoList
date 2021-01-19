import React from "react";
import {Provider} from 'react-redux';
import {AppRootState, store} from './state/store';
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./state/tasks-reducer";
import {v1} from "uuid";
import {todoListsReducer} from "./state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {
            id: "todolistId1", title: "What to learn", filter: "all", addedDate: '',
            order: 0
        },
        {
            id: "todolistId2", title: "What to buy", filter: "all", addedDate: '',
            order: 0
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>)