import {Dispatch} from "redux";


const SET_PRODUCTS_ALL = 'SET_PRODUCTS_ALL'
const SET_CURRENT_PRODUCTS = 'SET_CURRENT_PRODUCTS'
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT'


export type productType = {
    prices: any,
    name:string
    category: any,
    description: any,
    gallery: any,
    attributes: any,
    inStock: any,
    brand: any,
    id: any,
    count : 1
}


let initState = {
    products: [] as productType[],
    currentProducts: [] as productType[],
    currentProduct: {} as productType | undefined
}
type setProductsALL = {
    type: typeof SET_PRODUCTS_ALL,
    payload: productType[]
}
type setCurrentProducts = {
    type: typeof SET_CURRENT_PRODUCTS,
    payload: string
}

type setCurrentProduct = {
    type: typeof SET_CURRENT_PRODUCT,
    payload: string
}

type initStateType = typeof initState
type actionType = setCurrentProduct | setCurrentProducts | setProductsALL

export const ProductListReducer = (state: initStateType = initState, action: actionType): initStateType => {
    switch (action.type) {
        case "SET_CURRENT_PRODUCT": {
            let copyState = {...state}
            return {...state, currentProduct:copyState.currentProducts.find((product)=> product.id === action.payload)}
        }
        case "SET_CURRENT_PRODUCTS": {
            let copyState = {...state}
            let currentProducts = copyState.products.filter(product => product.category === action.payload)
            return {...state, currentProducts: currentProducts}
        }
        case "SET_PRODUCTS_ALL": {
            return {...state, products: action.payload}
        }

        default: {
            return state
        }
    }
}

//AC

const setProductsALL = (state: productType[]): setProductsALL => ({type: SET_PRODUCTS_ALL, payload: state})
const setCurrentProducts = (categoryNAME: string): setCurrentProducts => ({type: SET_CURRENT_PRODUCTS, payload: categoryNAME})
const setCurrentProduct = (productID: string): setCurrentProduct => ({type: SET_CURRENT_PRODUCT, payload: productID})


//TC
export const getCurrentProducts = (categoryNAME: string) => (dispatch:Dispatch)=>{

    dispatch(setCurrentProducts(categoryNAME))
}

export const getAllProducts = (state: productType[]) => (dispatch: Dispatch) => {
    dispatch(setProductsALL(state))
}
export const getCurrentProduct = (productID: string)=>(dispatch:Dispatch)=>{
    dispatch(setCurrentProduct(productID))
}
