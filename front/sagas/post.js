import axios from 'axios'
import { all, fork, takeLatest, put, delay, throttle, call } from 'redux-saga/effects'
import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

function loadPostsAPI(data) {
  return axios.get('/posts', data)
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
}

function addPostAPI(data) {
  return axios.post('/post', { content: data })
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
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

function remvoePostAPI(data) {
  return axios.delete(`/post/${data}`)
}

function* removePost(action) {
  try {
    const result = yield call(remvoePostAPI, action.data)

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
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

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data)
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.log('addCommnetError', error)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`)
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data)
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.log('addCommnetError', error)
    yield put({
      type: LIKE_POST_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/unlike`)
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ])
}
