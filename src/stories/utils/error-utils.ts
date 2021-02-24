import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../../api/todolists-api"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<setAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<setAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatusAC('failed'))
}