import {v1} from 'uuid';
import {
    addToDoListAC, changeTodolistEntityStatusAC, changeToDoListFilterAC,
    changeToDoListTitleAC, FilterValuesType,
    removeToDoListAC, setTodolistsAC, TodolistDomainType,
    todoListsReducer
} from "./todolists-reducer";
import {TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType> = [];


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {
            id: todolistId1, title: 'What to learn', filter: "all", addedDate: '',
            order: 0, entityStatus: "idle"
        },
        {
            id: todolistId2, title: 'What to buy', filter: "all", addedDate: '',
            order: 0, entityStatus: "idle"
        }
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeToDoListAC(todolistId1))


    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should be added', () => {

    let todolist: TodolistType = {
        title: "New title",
        addedDate: '',
        order: 0,
        id: 'any id'
    };

    const endState = todoListsReducer(startState, addToDoListAC(todolist));


    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();

})

test('correct todolist should change its name', () => {

    let newToDoListTitle = "New TodoList";

    const action = changeToDoListTitleAC(todolistId2, newToDoListTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newToDoListTitle);

})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeToDoListFilterAC(todolistId2, newFilter)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);

})

test('todolists should be set to the state', () => {

    let newFilter: FilterValuesType = "completed";

    const action = setTodolistsAC(startState)

    const endState = todoListsReducer([], action)

    expect(endState.length).toBe(2);

})

test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);

})

