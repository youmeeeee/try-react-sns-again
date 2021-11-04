import axios from 'axios'
import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects'
import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
} from '../reducers/user'

function loginAPI(data) {
    return axios.post('api/login', data)
}

function* login(action) {
    try {
        // const result = yield call(loginAPI, action.dataI)
        yield delay(1000)

        //put은 dispatch라고 생각하자!
        yield put({
            type: LOGIN_SUCCESS,
            data: {...action.data, nickname: 'youme'}
            // data: result.data 
        })
    } catch (error) {
        yield put({
            type: LOGIN_FAILURE,
            error: error.response.data
        })
    }
}

function* watchLogin() {
    //take - LOGIN이랑 액션이 실행될 때까지 기다린다.
    yield takeLatest(LOGIN_REQUEST, login)
}


function logoutAPI() {
    return axios.post('api/logout')
}

function* logout() {
    try {
        // const result = yield call(logoutAPI)
        yield delay(1000)

        yield put({
            type: LOGOUT_SUCCESS,
            // data: result.data 
        })
    } catch (error) {
        yield put({
            type: LOGOUT_FAILURE,
            error: error.response.data
        })
    }
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout)
}

function signupAPI() {
    return axios.post('api/signup')
}

function* signup() {
    try {
        // const result = yield call(signupAPI)
        yield delay(1000)

        yield put({
            type: SIGNUP_SUCCESS,
            // data: result.data 
        })
    } catch (error) {
        yield put({
            type: SIGNUP_FAILURE,
            error: error.response.data
        })
    }
}

function* watchSignup() {
    yield takeLatest(SIGNUP_REQUEST, signup)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup)
    ])
}