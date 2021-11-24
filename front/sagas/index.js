import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

import postSaga from './post'
import userSaga from './user'

axios.defaults.baseURL = 'http://localhost:3065'

export default function* rootSaga() {
  // all 배열을 받아서 동시에 처리
  yield all([
    // fork, call generator함수를 실행한다.
    // fork는 비동기 함수 호출 (non-blocking)
    // call 동기 함수 호출 (blocking) (await이랑 비슷한 역할?!)
    fork(userSaga),
    fork(postSaga),
  ])
}
