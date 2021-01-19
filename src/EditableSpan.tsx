import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = useCallback(() => {
        setEditMode(false)
        props.onChange(title)
    }, [props.onChange])

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})