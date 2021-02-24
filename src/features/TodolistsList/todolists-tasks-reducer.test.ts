import {TaskStateType} from "../../trash/App";
import {addToDoListAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TodolistType} from "../../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistType = {
        title: "New title",
        addedDate: '',
        order: 0,
        id: 'any id'
    };

    const action = addToDoListAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFormTasks = keys[0];
    const idFormTodolists = endTodolistsState[0].id;

    expect(idFormTasks).toBe(action.todolist.id);
    expect(idFormTodolists).toBe(action.todolist.id);
})