import axios from 'axios'

const initialState = {
    loginLoading: false,
    loginDone: false,
    loginError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
    signupLoading: false,
    signupDone: false,
    signupError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    me: null,
    signupData: {},
    loginData: {}
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_REQUEST'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_REQUEST'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_REQUEST'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_REQUEST'

export const loginRequestAction = (data) => {
    return {
        type: LOGIN_REQUEST,
        data
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

const dummyUser = (data) => ({
    ...data,
    nickname: 'youme',
    id: 1,
    Posts: [],
    Followings: [],
    Follwers: []
})

// (이전  상태, 액션) => 다음상태
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginDone: false,
                loginError: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginDone: true,
                me: dummyUser(action.data)
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                loginError: action.error,
s            }
        case LOGOUT_REQUEST: 
            return {
                ...state,
                logoutLoading: true,
                logoutDone: false,
                logoutError: null
            }
        case LOGOUT_SUCCESS: 
            return { 
                ...state,
                logoutLoading: false,
                logoutDone: true,
                me: null
            }
        case LOGOUT_FAILURE: 
            return {
                ...state,
                logoutLoading: false,
                lgoutError: action.error
            }
        case SIGNUP_REQUEST: 
            return {
                ...state,
                signupLoading: true,
                signupDone: false,
                signupError: null
            }
        case SIGNUP_SUCCESS: 
            return { 
                ...state,
                signupLoading: false,
                signupDone: true,
            }
        case SIGNUP_FAILURE: 
            return {
                ...state,
                signupLoading: false,
                singupError: action.error
            }
        default:
            return state
    }
}

export default userReducer