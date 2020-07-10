import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import * as application from './application/index'
import * as products from './products/index'

const reducer = combineReducers({
    application : application.reducer,
    products : products.reducer
})

const store = createStore(reducer, compose(
    applyMiddleware(products.middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store