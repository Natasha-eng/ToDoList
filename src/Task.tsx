import React, {ChangeEvent} from "react";
import {TaskType} from "./AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    //taskId
    task: TaskType
    toDoListId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({task,toDoListId }) => {
    console.log('Task called')

    const dispatch = useDispatch();
    const onRemoveHandler =() => dispatch(removeTaskAC(task.id, toDoListId))

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, toDoListId));
    }

    const onChangeTitleHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, toDoListId));
    }

    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

