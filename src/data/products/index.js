import { fetchData } from '../firebase.configuration'

const initialState = []
const COLLECTION_PATH = '/products'
const LOAD_PRODUCTS = '[Products] load products'
const SET_LIST_PRODUCTS = '[Products] set list'


const loadProduct = () => ({ type: LOAD_PRODUCTS })
const setProductList = products => ({ type: SET_LIST_PRODUCTS, payload: products })


/**
 * Exportable actions
 */
export const actions = {
    loadProduct
}

/**
 * Products reducer
 * @param {Array<Object>} state 
 * @param {object} action 
 */
export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LIST_PRODUCTS: return payload
        default:
            return state
    }
}


export const middleware = ({ dispatch }) => next => ({ type, payload }) => {
    next({ type, payload })

    if (type === LOAD_PRODUCTS) {
        fetchData(COLLECTION_PATH)
            .then(products => dispatch(setProductList(products)))
    }

}
