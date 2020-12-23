import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    task: TaskType
    toDoListId: string
}


export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task called')

    const dispatch = useDispatch();
    const onRemoveHandler = useCallback(() => dispatch(removeTaskAC(props.task.id, props.toDoListId)), [dispatch, props.task.id, props.toDoListId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.toDoListId));
    }, [dispatch, props.task.id, props.toDoListId])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.toDoListId));
    }, [dispatch, props.task.id, props.toDoListId])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

