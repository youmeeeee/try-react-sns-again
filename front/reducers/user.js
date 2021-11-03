import axios from 'axios'

const initialState = {
    isLoggedIn: false,
    me: null,
    signupData: {},
    loginData: {}
}

export const loginAction = (data) => {
    return (dispatch, getState) => {
        const state = getState() //initialState
        dispatch(loginRequestAction());
        axios.post('/api/login')
            .thne((res) => {
                dispatch(loginSuccessAction(res.data))
            })
            .catch((error) => {
                dispatch(loginFailureAction(error))
            })
    }
}

export const loginRequestAction = (data) => {
    return {
        type: 'LOGIN_REQUEST',
        data
    }
}

export const loginSuccessAction = (data) => {
    return {
        type: 'LOGIN_SUCCESS',
        data
    }
}

export const loginFailureAction = (data) => {
    return {
        type: 'LOGIN_FAILURE',
        data
    }
}

export const logoutRequestAction = () => {
    return {
        type: 'LOGOUT_REQUEST'
    }
}

export const logoutSuccessAction = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const logoutFailureAction = () => {
    return {
        type: 'LOGOUT_FAILURE'
    }
}


// (이전  상태, 액션) => 다음상태
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                me: action.data
            }
        case 'LOGOUT': 
            return {
                ...state,
                isLoggedIn: false,
                me: null
            }
        default:
            return state
    }
}

export default userReducer