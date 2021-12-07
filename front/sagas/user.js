import axios from 'axios'
import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import {
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
  REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
  CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
} from '../reducers/user'

function loadMyInfoAPI() {
  return axios.get('/user')
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data)
    // put은 dispatch라고 생각하자!
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.log('@@@error', error)
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

function loginAPI(data) {
  return axios.post('/user/login', data)
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data)
    console.log(`login result: ${result}`)
    // put은 dispatch라고 생각하자!
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLogin() {
  // take - LOGIN이랑 액션이 실행될 때까지 기다린다.
  yield takeLatest(LOGIN_REQUEST, login)
}

function logoutAPI() {
  return axios.post('/user/logout')
}

function* logout() {
  try {
    const result = yield call(logoutAPI)

    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout)
}

function signupAPI(data) {
  return axios.post('/user', data)
}

function* signup(action) {
  try {
    console.log('signup saga')
    const result = yield call(signupAPI, action.data)
    console.log(`signup result : ${result}`)
    yield put({
      type: SIGNUP_SUCCESS,
      // data: result.data,
    })
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchSignup() {
  console.log('watch sign up')
  yield takeLatest(SIGNUP_REQUEST, signup)
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data })
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data)
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}

function followAPI(data) {
  return axios.patch(`user/${data}/follow`)
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data)

    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/unfollow`)
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data)

    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`)
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data)

    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower)
}

function loadFollowingsAPI(data) {
  return axios.get('/user/followings', data)
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data)

    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
}

function loadFollowersAPI(data) {
  return axios.get('/user/followers', data)
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data)

    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers)
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchRemoveFollower),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchChangeNickname),
  ])
}
