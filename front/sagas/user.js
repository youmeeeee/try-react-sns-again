import axios from 'axios'
import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects'
import {
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
} from '../reducers/user'

function loadMyInfoAPI() {
  return axios.get('/user')
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data)
    console.log(`loadMyInfo result: ${result}`)
    // put은 dispatch라고 생각하자!
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    })
  } catch (error) {
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

// function followAPI() {
//     return axios.post('api/follow')
// }

function* follow(action) {
  try {
    // const result = yield call(followAPI)
    yield delay(1000)

    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
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

// function unfollowAPI() {
//     return axios.post('api/unfollow')
// }

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI)
    yield delay(1000)

    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
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

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
  ])
}
