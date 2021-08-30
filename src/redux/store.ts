import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {ProductListReducer} from "./reducers/productListReducer";
import {headerReducer} from "./reducers/headerReducer";




const rootReducer = combineReducers({
    productList:ProductListReducer,
    header:headerReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store



