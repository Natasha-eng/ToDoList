import React, {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {
    changeTaskStatusAC,
    changeTaskStatusTC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskThunkCreator
} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType, todolistsAPI} from "./api/todolists-api";

export type TaskPropsType = {
    //taskId
    task: TaskType
    toDoListId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, toDoListId}) => {
    console.log('Task called')

    const dispatch = useDispatch();

    const onRemoveHandler = () => {
        const thunk = removeTaskThunkCreator(task.id, toDoListId);
        dispatch(thunk);
    }

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusTC(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, toDoListId));
    }

    const onChangeTitleHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, toDoListId));
    }

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

