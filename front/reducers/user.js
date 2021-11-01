const initialState = {
    isLoggedIn: false,
    me: null,
    signupData: {},
    loginData: {}
}

export const loginAction = (data) => {
    return {
        type: 'LOGIN',
        data
    }
}

export const logoutAction = () => {
    return {
        type: 'LOGOUT'
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