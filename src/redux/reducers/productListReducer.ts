import {Dispatch} from "redux";


const SET_PRODUCTS_ALL = 'SET_PRODUCTS_ALL'
const SET_CURRENT_PRODUCTS = 'SET_CURRENT_PRODUCTS'
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT'
const SET_CURRENT_BIG_IMAGE = 'SET_CURRENT_BIG_IMAGE'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY'
const SET_CURRENT_ATTRIBUTES = 'SET_CURRENT_ATTRIBUTES'
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'
const INCREMENT_COUNT = 'INCREMENT_COUNT'
const DECREMENT_COUNT = 'DECREMENT_COUNT'


export type productType = {
    prices: any[],
    name: string
    category: string,
    description: string,
    gallery: string[],
    attributes: any[],
    inStock: boolean,
    brand: string,
    id: string,
    count: number,
    currentAmount: number,
    currentAttributes: [],
}


let initState = {
    products: [] as productType[],
    currentProducts: [] as productType[],
    currentProduct: {} as productType,
    cartItems: [] as productType[],
    currentBigImage: '' as string,
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
type setCurrentBigImage = {
    type: typeof SET_CURRENT_BIG_IMAGE,
    payload: string
}
type addProductToCart = {
    type: typeof ADD_PRODUCT_TO_CART,
    payload: productType
}

type setCurrentCurrency = {
    type: typeof SET_CURRENT_CURRENCY,
    id: string,
    amount: number
}

type setCurrentAttributes = {
    type: typeof SET_CURRENT_ATTRIBUTES,
    payload: any
}

type deleteItemFromCart = {
    type: typeof DELETE_PRODUCT_FROM_CART,
    payload: {
        id: string
    }
}

type IncrementCount = {
    type: typeof INCREMENT_COUNT,
    payload: {
        id: string
    }
}

type DecrementCount = {
    type: typeof DECREMENT_COUNT,
    payload: {
        id: string
    }
}

type initStateType = typeof initState
type actionType =
    setCurrentProduct
    | setCurrentProducts
    | setProductsALL
    | setCurrentBigImage
    | addProductToCart
    | setCurrentCurrency
    | setCurrentAttributes
    | deleteItemFromCart
    | IncrementCount
    | DecrementCount

export const ProductListReducer = (state: initStateType = initState, action: actionType): initStateType => {
    switch (action.type) {
        case "SET_CURRENT_PRODUCT": {
            let copyState = {...state}
            return {
                ...state,
                currentProduct: {
                    ...copyState.currentProducts.find((product) => product.id === action.payload),
                    count: 1
                } as productType
            }
        }
        case "SET_CURRENT_PRODUCTS": {
            let copyState = {...state}
            let currentProducts = copyState.products.filter(product => product.category === action.payload)

            return {...state, currentProducts: currentProducts}
        }
        case "SET_PRODUCTS_ALL": {
            return {...state, products: action.payload}
        }
        case "SET_CURRENT_BIG_IMAGE": {
            return {...state, currentBigImage: action.payload}
        }
        case "ADD_PRODUCT_TO_CART": {
            return {...state, cartItems: [...state.cartItems, action.payload]}
        }
        case "SET_CURRENT_CURRENCY": {
            return {
                ...state,
                products: state.products.map(product => product.id == action.id ? {
                    ...product,
                    currentAmount: action.amount,
                    count: 1
                } : product)
            }
        }
        case "SET_CURRENT_ATTRIBUTES": {
            debugger
            return {
                ...state,
                currentProduct: {
                    ...state.currentProduct,
                    currentAttributes: [...state.currentProduct.currentAttributes ? state.currentProduct.currentAttributes : [], action.payload]
                } as any
            }
        }
        case "INCREMENT_COUNT": {
            let copyState = {...state}
            let currentProduct = copyState.cartItems.find(product => product.id === action.payload.id)
            if (currentProduct) {
                currentProduct.count += 1
            }
            return copyState
        }
        case "DECREMENT_COUNT": {
            let copyState = {...state}
            let currentProduct = copyState.cartItems.find(product => product.id === action.payload.id)
            if (currentProduct) {
                currentProduct.count -= 1
            }
            return copyState
        }
        case "DELETE_PRODUCT_FROM_CART": {
            return {...state, cartItems: state.cartItems.filter(item => item.id !== action.payload.id)}
        }

        default: {
            return state
        }
    }
}

//AC

const setProductsALL = (state: productType[]): setProductsALL => ({type: SET_PRODUCTS_ALL, payload: state})
const setCurrentProducts = (categoryNAME: string): setCurrentProducts => ({
    type: SET_CURRENT_PRODUCTS,
    payload: categoryNAME
})
const setCurrentProduct = (productID: string): setCurrentProduct => ({type: SET_CURRENT_PRODUCT, payload: productID})
const setCurrentImage = (image: string): setCurrentBigImage => ({type: SET_CURRENT_BIG_IMAGE, payload: image})
const addProductToCart = (product: productType): addProductToCart => ({type: ADD_PRODUCT_TO_CART, payload: product})
const setAttributes = (attribute: any): setCurrentAttributes => ({type: SET_CURRENT_ATTRIBUTES, payload: attribute})
const setCurrentCurrency = (id: string, amount: number): setCurrentCurrency => ({
    type: SET_CURRENT_CURRENCY,
    amount: amount,
    id: id
})

const DeleteProductsFromCart = (id:string):deleteItemFromCart=>({type:DELETE_PRODUCT_FROM_CART,payload:{id:id}})
const setIncrementCount = (id:string):IncrementCount=>({type:INCREMENT_COUNT,payload:{id}})
const setDecrementCount = (id:string):DecrementCount=>({type:DECREMENT_COUNT,payload:{id}})

//TC
export const getCurrentProducts = (categoryNAME: string) => (dispatch: Dispatch) => {
    dispatch(setCurrentProducts(categoryNAME))
}

export const getAllProducts = (state: productType[]) => (dispatch: Dispatch) => {
    dispatch(setProductsALL(state))
}
export const getCurrentProduct = (productID: string) => (dispatch: Dispatch) => {
    dispatch(setCurrentProduct(productID))
}
export const getCurrentImage = (image: string) => (dispatch: Dispatch) => {
    dispatch(setCurrentImage(image))
}
export const addProductToCartTC = (product: productType) => (dispatch: Dispatch) => {
    dispatch(addProductToCart(product))
}
export const setCurrentCurrencyTC = (id: string, amount: number) => (dispatch: Dispatch) => {
    dispatch(setCurrentCurrency(id, amount))
}
export const setAttributesTC = (attribute: any) => (dispatch: Dispatch) => {
    dispatch(setAttributes(attribute))
}

export const SetDeletedAttribute = (id:string) => (dispatch:Dispatch) => {
    dispatch(DeleteProductsFromCart(id))
}
export const SetIncrementCount = (id:string)=>(dispatch:Dispatch)=>{
    dispatch(setIncrementCount(id))
}
export const SetDecrementCount = (id:string)=>(dispatch:Dispatch)=>{
    dispatch(setDecrementCount(id))
}
