import { fetchData, getDataById, saveData } from '../firebase.configuration'
import { actions as appAction } from '../application/index'

/**
 * @typedef {object} Product
 * @property {string} id - Product Id
 * @property {string} name - Product name
 * @property {string} description - Description
 * 
 * @typedef {object} ProductState
 * @property {Product} selected - Selected product
 * @property {Array<Product>} list
 */
const defaultProduct = {
    id: null,
    name: '',
    description: '',
    imageUrl: ''
}


const initialState = {
    selected: defaultProduct,
    list: []
}
const COLLECTION_PATH = '/products'
const LOAD_PRODUCTS = '[Products] load products'
const LOAD_PRODUCTS_BY_ID = '[Products] load products by Id'
const SET_LIST_PRODUCTS = '[Products] set list'
const SET_SELECTED_PRODUCT = '[Products] Select one product'
const SAVE_PRODUCT = '[Products] Save Product'


const loadProduct = () => ({ type: LOAD_PRODUCTS })
const setProductList = products => ({ type: SET_LIST_PRODUCTS, payload: products })
const loadProductById = id => ({ type: LOAD_PRODUCTS_BY_ID, payload: { id } })
const setSelectedProduct = product => ({ type: SET_SELECTED_PRODUCT, payload: product })
const saveProduct = product => ({ type : SAVE_PRODUCT, payload : product})


/**
 * Exportable actions
 */
export const actions = {
    loadProduct,
    loadProductById,
    saveProduct
}


/**
 * Products reducer
 * @param {ProductState} state 
 * @param {object} action 
 */
export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LIST_PRODUCTS: return {
            ...state,
            list: payload
        }
        case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selected: payload
            }
        default:
            return state
    }
}


const handleFinally = dispatch => action => {
    return () => {
        dispatch(action)
    }
}

export const middleware = ({ getState, dispatch }) => next => ({ type, payload }) => {
    next({ type, payload })

    if (type === LOAD_PRODUCTS) {

        dispatch(appAction.setLoading(true))
        fetchData(COLLECTION_PATH)
            .then(products => {
                dispatch(setProductList(products))
                dispatch(appAction.setLoading(false))
            })
            .catch(error => console.log('Error', error))

    }

    if (type === LOAD_PRODUCTS_BY_ID) {
        switch (payload.id) {
            case 'new':
                dispatch(setSelectedProduct(defaultProduct))
                break;
            default:
                dispatch(appAction.setLoading(true))
                getDataById(COLLECTION_PATH, payload.id)
                    .then(product => {
                        dispatch(setSelectedProduct(product))
                    })
                    .catch(e => {

                    })
                    .then(handleFinally(dispatch(appAction.setLoading(false))))
        }
    }

    if(type === SAVE_PRODUCT) {
        dispatch(appAction.setLoading(true))
        saveData(COLLECTION_PATH, payload)
            .then(success => {

            })
            .catch(error => {

            })
            .then(handleFinally(dispatch(appAction.setLoading(false))))
    }



}
