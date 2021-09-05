import {Dispatch} from "redux"


const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_CURRENCIES = 'SET_CURRENCIES'
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'
const SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY'
const SET_SELECT = 'SET_SELECT'

let headerInitState = {
    categories: [] as any,
    currencies: [] as any,
    currentCurrency:0,
    currentCategory: '',
    select: false,
}
type headerInitStateType = typeof headerInitState

type setCategories = {
    type: typeof SET_CATEGORIES,
    payload: any[]
}

type setCurrencies = {
    type: typeof SET_CURRENCIES,
    payload: string[]
}
type setCurrentCategory = {
    type: typeof SET_CURRENT_CATEGORY,
    payload: string
}
type setCurrentCurrency = {
    type: typeof SET_CURRENT_CURRENCY,
    payload: number
}
type setSelectEdit = {
    type: typeof SET_SELECT,
    payload: boolean
}
type actionType = setCategories | setCurrentCurrency | setCurrencies | setCurrentCategory | setSelectEdit


export const headerReducer = (state: headerInitStateType = headerInitState, action: actionType): headerInitStateType => {
    switch (action.type) {
        case "SET_CATEGORIES": {
            return {...state, categories: action.payload}
        }
        case "SET_CURRENCIES": {
            return {...state, currencies: action.payload}
        }
        case "SET_CURRENT_CURRENCY": {
            return {...state, currentCurrency: action.payload}
        }
        case "SET_CURRENT_CATEGORY": {
            return {...state, currentCategory: action.payload}
        }
        case "SET_SELECT": {
            return {...state, select: action.payload}
        }

        default: {
            return state;
        }
    }


}
//AC
const setCategories = (categories: any[]): setCategories => ({type: "SET_CATEGORIES", payload: categories})
const setCurrencies = (currencies: string[]): setCurrencies => ({type: "SET_CURRENCIES", payload: currencies})
const setCurrentCurrency = (currency: number): setCurrentCurrency => ({type: "SET_CURRENT_CURRENCY", payload: currency})
const setCurrentCategory = (category: string): setCurrentCategory => ({type: 'SET_CURRENT_CATEGORY', payload: category})
const setSelectEdit = (select: boolean): setSelectEdit => ({type: SET_SELECT, payload: select})


//TC
export const getCategoriesThunk = (categories: any[]) => (dispatch: Dispatch) => {
    dispatch(setCategories(categories))
}

export const getCurrenciesThunk = (currencies: string[]) => (dispatch: Dispatch) => {
    dispatch(setCurrencies(currencies))
}
export const ChangeCurrentCategory = (category: string) => (dispatch: Dispatch) => {
    dispatch(setCurrentCategory(category))
}
//изменение состояния селекта  + currentCurrency
export const ChangeCurrentCurrency = (select: boolean, currency: number) => (dispatch: Dispatch) => {
    dispatch(setCurrentCurrency(currency));
    dispatch(setSelectEdit(select));
}
//переключалка
export const changeSelectStatus = (select: boolean) => (dispatch: Dispatch) => {
    dispatch(setSelectEdit(select));
}





