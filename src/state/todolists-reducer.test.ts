import {v1} from 'uuid';
import {FilterValuesType, ToDoListType} from "../App";
import {
    addToDoListAC, changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeToDoListAC,
    todoListsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, removeToDoListAC(todolistId1))


    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newToDoListTitle = "New TodoList";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"}
    ]

    const endState = todoListsReducer(startState, addToDoListAC(newToDoListTitle));


    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newToDoListTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();

})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newToDoListTitle = "New TodoList";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"}
    ]

    const action = changeToDoListTitleAC(todolistId2, newToDoListTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newToDoListTitle);

})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<ToDoListType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"}
    ]

    const action = changeToDoListFilterAC(todolistId2, newFilter)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);

})
