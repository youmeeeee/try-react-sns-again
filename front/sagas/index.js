import axios from 'axios'
import { all, fork, call, take, put } from 'redux-saga/effects'

function loginAPI(data) {
    return axios.post('api/login', data)
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action.dataI)

        //put은 dispatch라고 생각하자!
        yield put({
            type: 'LOGIN_SUCCESS',
            data: result.data 
        })
    } catch (error) {
        yield put({
            type: 'LOGIN_FAILURE',
            data: error.response.data
        })
    }
}

function* watchLogin() {
    //take - LOGIN이랑 액션이 실행될 때까지 기다린다.
    yield take('LOGIN_REQUEST', login)
}


function logoutAPI() {
    return axios.post('api/logout')
}

function* logout() {
    try {
        const result = yield call(logoutAPI)

        yield put({
            type: 'LOGOUT_SUCCESS',
            data: result.data 
        })
    } catch (error) {
        yield put({
            type: 'LOGOUT_FAILURE',
            data: error.response.data
        })
    }
}

function* watchLogout() {
    yield take('LOGOUT_REQUEST', logout)
}


function addPostAPI(data) {
    return axios.post('api/post', data)
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data)

        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data 
        })
    } catch (error) {
        yield put({
            type: 'ADD_POST_FAILURE',
            data: error.response.data
        })
    }
}

function* watchAddPost() {
    yield take('ADD_POST_REQUEST', addPost)
}

export default function* rootSaga () {
    //all 배열을 받아서 동시에 처리
    yield all([
        //fork, call generator함수를 실행한다.
        //fork는 비동기 함수 호출 (non-blocking)
        //call 동기 함수 호출 (blocking) (await이랑 비슷한 역할?!)
        fork(watchLogin),  
        fork(watchLogout),
        fork(watchAddPost),
    ])
} 