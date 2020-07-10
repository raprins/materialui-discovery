
const SET_LOADING = '[Application] Set loading'
const APP_OPERATION_SUCCESS = '[Application] Operation Success'

export const actions = {
    setLoading: loading => ({ type: SET_LOADING, payload: loading }),
    operationSuccess : () => ({ type : APP_OPERATION_SUCCESS })
}

const initialState = {
    loading: false,
    operation : null
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LOADING : return ({
            ...state,
            loading : payload
        })
        default:
            return state
    }
}
