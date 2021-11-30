// import axios from 'axios'
import produce from 'immer'

const initialState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
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

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST'
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS'
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

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
  Posts: [
    { id: 1 },
  ],
  Followings: [
    { nickname: 'following1' },
    { nickname: 'following2' },
    { nickname: 'following3' },
  ],
  Followers: [
    { nickname: 'follower1' },
    { nickname: 'follower2' },
    { nickname: 'follower3' },
    { nickname: 'follower4' },
    { nickname: 'follower5' },
  ],
})

// (이전  상태, 액션) => 다음상태
export const userReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
  case LOAD_MY_INFO_REQUEST:
    draft.loadMyInfoLoading = true
    draft.loadMyInfoDone = false
    draft.loadMyInfoError = null
    break
  case LOAD_MY_INFO_SUCCESS:
    draft.loadMyInfoLoading = false
    draft.loadMyInfoDone = true
    draft.me = action.data
    break
  case LOAD_MY_INFO_FAILURE:
    draft.loadMyInfoLoading = false
    draft.loadMyInfoError = action.error
    break
  case LOGIN_REQUEST:
    draft.loginLoading = true
    draft.loginDone = false
    draft.loginError = null
    break
  case LOGIN_SUCCESS:
    draft.loginLoading = false
    draft.loginDone = true
    draft.me = action.data
    break
  case LOGIN_FAILURE:
    draft.loginLoading = false
    draft.loginError = action.error
    break
  case LOGOUT_REQUEST:
    draft.logoutLoading = true
    draft.logoutDone = false
    draft.logoutError = null
    break
  case LOGOUT_SUCCESS:
    draft.logoutLoading = false
    draft.logoutDone = true
    draft.me = null
    break
  case LOGOUT_FAILURE:
    draft.logoutLoading = false
    draft.logoutError = action.error
    break
  case SIGNUP_REQUEST:
    draft.signupLoading = true
    draft.signupDone = false
    draft.signupError = null
    break
  case SIGNUP_SUCCESS:
    draft.signupLoading = false
    draft.signupDone = true
    break
  case SIGNUP_FAILURE:
    draft.signupLoading = false
    draft.signupError = action.error
    break
  case CHANGE_NICKNAME_REQUEST:
    draft.changeNicknameLoading = true
    draft.changeNicknameDone = false
    draft.changeNicknameError = null
    break
  case CHANGE_NICKNAME_SUCCESS:
    draft.changeNicknameLoading = false
    draft.changeNicknameDone = true
    break
  case CHANGE_NICKNAME_FAILURE:
    draft.changeNicknameLoading = false
    draft.changeNicknameError = action.error
    break
  case FOLLOW_REQUEST:
    draft.followLoading = true
    draft.followDone = false
    draft.followError = null
    break
  case FOLLOW_SUCCESS:
    draft.me.Followings.push({ id: action.data })
    draft.followLoading = false
    draft.followDone = true
    break
  case FOLLOW_FAILURE:
    draft.followLoading = false
    draft.followError = action.error
    break
  case UNFOLLOW_REQUEST:
    draft.unfollowLoading = true
    draft.unfollowDone = false
    draft.unfollowError = null
    break
  case UNFOLLOW_SUCCESS:
    draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data)
    draft.unfollowLoading = false
    draft.unfollowDone = true
    break
  case UNFOLLOW_FAILURE:
    draft.unfollowLoading = false
    draft.unfollowError = action.error
    break
  case ADD_POST_TO_ME:
    draft.me.Posts.unshift({ id: action.data })
    break
  case REMOVE_POST_OF_ME:
    draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data)
    break
  default:
    break
  }
})

export default userReducer
