import {TaskStateType} from "../App";
import {addToDoListAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<ToDoListType> = [];

    const action = addToDoListAC("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFormTasks = keys[0];
    const idFormTodolists = endTodolistsState[0].id;

    expect(idFormTasks).toBe(action.todolistId);
    expect(idFormTodolists).toBe(action.todolistId);
})