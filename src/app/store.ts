import {createStore, combineReducers,applyMiddleware} from "redux";
import {todoListsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

/*type AppRootState = {
    todoLists: Array<ToDoListType>
    tasks: TaskStateType
}*/

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;