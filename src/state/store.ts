import {createStore, combineReducers,applyMiddleware} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

/*type AppRootState = {
    todoLists: Array<ToDoListType>
    tasks: TaskStateType
}*/

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;