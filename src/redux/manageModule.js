
export const manageTypes = {
    //REQUEST
    GET_ALL_PRODUCTS_REQUEST: 'GET_ALL_PRODUCTS_REQUEST',
    CREATE_PRODUCT_REQUEST: 'CREATE_PRODUCT_REQUEST',
    UPDATE_PRODUCT_REQUEST: 'UPDATE_PRODUCT_REQUEST',
    UPDATE_USER_INFO_REQUEST: 'UPDATE_USER_INFO_REQUEST',
    GET_ALL_USERS_REQUEST: 'GET_ALL_USERS_REQUEST',
    //SUCCESS
    GET_ALL_PRODUCTS_SUCCESS: 'GET_ALL_PRODUCTS_SUCCESS',
    CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
    UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
    UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',
    GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
    //FAILED
    MANAGE_FAILURE: ' MANAGE_FAILURE'
}

const initialState = {
    products: [],
    users: [],
    error: ''
}

export default function manageReducers(state = initialState, action) {
    switch (action.type) {
        case manageTypes.GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload }
        case manageTypes.CREATE_PRODUCT_SUCCESS:
            return { ...state, products: action.payload }
        case manageTypes.UPDATE_PRODUCT_SUCCESS:
            return { ...state, products: action.payload }
        case manageTypes.UPDATE_USER_INFO_SUCCESS:
            return { ...state, users: action.payload }
        case manageTypes.GET_ALL_USERS_SUCCESS:
            return { ...state, users: action.payload }
        case manageTypes.MANAGE_FAILURE:
            return { ...state, error: action.payload }
        default:
            return state
    }
}