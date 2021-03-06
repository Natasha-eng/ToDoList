import {TaskStateType} from "../../trash/App";
import {
    addTaskAC,
    updateTaskAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "./tasks-reducer";
import {addToDoListAC, removeToDoListAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TaskStateType = {};


beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: 'todoListID1', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todoListId: 'todoListID1', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todoListId: 'todoListID1', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: 'todoListID2', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                todoListId: 'todoListID2', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: 'todoListID2', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.High,
                description: ''
            }
        ]
    };
})


test('correct task should be deleted from array', () => {

    const action = removeTaskAC("2", "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t => t.id! = "2")).toBeTruthy()
})

test('correct task should be added to array', () => {

    // const action = addTaskAC("juce", "todolistId2")
    const action = addTaskAC({
        todoListId: "todolistId2",
        status: TaskStatuses.New,
        title: "juce",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "11111"
    })
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);


})

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title: "MilkyWay"}, "todolistId2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('MilkyWay');
    expect(endState["todolistId1"][1].title).toBe("JS");


})

test('new property with new array should be added when new todolist is added', () => {

    const action = addToDoListAC({
        id: '111',
        title: 'new todolist',
        order: 0,
        addedDate: ''
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("mew key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {

    const action = removeToDoListAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
    expect(keys[0]).toBe("todolistId1");
})

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {
            id: '1', title: 'title1', addedDate: '',
            order: 0
        },
        {
            id: '2', title: 'title2', addedDate: '',
            order: 0
        }
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
})

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState["todolistId1"], "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
})