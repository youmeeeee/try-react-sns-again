// import axios from 'axios'

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
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  me: null,
  signupData: {},
  loginData: {},
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_REQUEST'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_REQUEST'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_REQUEST'

export const loginRequestAction = (data) => ({
  type: LOGIN_REQUEST,
  data,
})

export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
})

const dummyUser = (data) => ({
  ...data,
  nickname: 'youme',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
})

// (이전  상태, 액션) => 다음상태
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      loginLoading: true,
      loginDone: false,
      loginError: null,
    }
  case LOGIN_SUCCESS:
    return {
      ...state,
      loginLoading: false,
      loginDone: true,
      me: dummyUser(action.data),
    }
  case LOGIN_FAILURE:
    return {
      ...state,
      loginLoading: false,
      loginError: action.error,
    }
  case LOGOUT_REQUEST:
    return {
      ...state,
      logoutLoading: true,
      logoutDone: false,
      logoutError: null,
    }
  case LOGOUT_SUCCESS:
    return {
      ...state,
      logoutLoading: false,
      logoutDone: true,
      me: null,
    }
  case LOGOUT_FAILURE:
    return {
      ...state,
      logoutLoading: false,
      lgoutError: action.error,
    }
  case SIGNUP_REQUEST:
    return {
      ...state,
      signupLoading: true,
      signupDone: false,
      signupError: null,
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
      signupError: action.error,
    }
  case CHANGE_NICKNAME_REQUEST:
    return {
      ...state,
      changeNicknameLoading: true,
      changeNicknameDone: false,
      changeNicknameError: null,
    }
  case CHANGE_NICKNAME_SUCCESS:
    return {
      ...state,
      changeNicknameLoading: false,
      changeNicknameDone: true,
    }
  case CHANGE_NICKNAME_FAILURE:
    return {
      ...state,
      changeNicknameLoading: false,
      signupError: action.error,
    }
  default:
    return state
  }
}

export default userReducer
