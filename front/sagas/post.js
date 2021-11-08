// import axios from 'axios'
import { all, fork, takeLatest, put, delay } from 'redux-saga/effects'
import shortId from 'shortid'
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

// function addPostAPI(data) {
//     return axios.post('api/post', data)
// }

function* addPost(action) {
  try {
    console.log(action)
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000)
    const id = shortId.generate()
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        conent: action.data,
      },
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    })
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

// function remvoePostAPI(data) {
//     return axios.delete('api/post', data)
// }

function* removePost(action) {
  try {
    console.log(action)
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    })
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    })
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

// function addCommentAPI(data) {
//     return axios.post(`api/post/${data.postId}/comment`, data)
// }

function* addComment(action) {
  try {
    console.log(action)
    // const result = yield call(addCommentAPI, action.data)
    yield delay(1000)

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    })
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ])
}
