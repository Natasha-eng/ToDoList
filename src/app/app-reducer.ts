import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../stories/utils/error-utils";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}

        default:
            return state
    }
}


//actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            } else {
                handleServerAppError(res.data, dispatch);
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    //если произойдет какая-то глобальная ошибка - то мы запишем текст ошибки сюда
    error: null | string
    // true когда приложение проинициализировалось
    isInitialized: boolean
}

export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType =
    setAppErrorActionType |
    SetAppStatusActionType |
    ReturnType<typeof setAppInitializedAC>