import {Dispatch} from "redux"

let headerInitState = {
    categories: [] as any,
    currencies: [] as any,
    currentCurrency: '',
    currentCategory: '',
    openCart: false,
    modalCart: false,
    select: false,
}
type headerInitStateType = typeof headerInitState

type setCategories = {
    type: 'SET_CATEGORIES',
    payload: any[]
}

type setCurrencies = {
    type: 'SET_CURRENCIES',
    payload: string[]
}
type setCurrentCategory = {
    type: 'SET_CURRENT_CATEGORY',
    payload: string
}


type setCurrentCurrency = {
    type: 'SET_CURRENT_CURRENCY',
    payload: string
}
type actionType = setCategories | setCurrentCurrency | setCurrencies | setCurrentCategory


export const headerReducer = (state: headerInitStateType = headerInitState, action: actionType): headerInitStateType => {
    switch (action.type) {
        case "SET_CATEGORIES": {
            return {...state, categories: action.payload}
        }
        case "SET_CURRENCIES": {
            return {...state, currencies: action.payload, currentCurrency: action.payload[0]}
        }
        case "SET_CURRENT_CURRENCY": {

            return {...state, currentCurrency: action.payload}
        }
        case "SET_CURRENT_CATEGORY": {
            return {...state, currentCategory: action.payload}
        }

        default: {
            return state;
        }
    }


}
//AC
const setCategories = (categories: any[]): setCategories => ({type: "SET_CATEGORIES", payload: categories})
const setCurrencies = (currencies: string[]): setCurrencies => ({type: "SET_CURRENCIES", payload: currencies})
const setCurrentCurrency = (currency: string): setCurrentCurrency => ({type: "SET_CURRENT_CURRENCY", payload: currency})
const setCurrentCategory = (category: string): setCurrentCategory => ({type: 'SET_CURRENT_CATEGORY', payload: category})
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





