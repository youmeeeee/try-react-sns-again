const initialState = {
    isLoggedIn: false,
    user: null,
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
                user: action.data
            }
        case 'LOGOUT': 
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            return state
    }
}

export default userReducer