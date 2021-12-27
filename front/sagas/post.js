import axios from 'axios'
import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects'
import {
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

function loadPostAPI(postId) {
  return axios.get(`post/${postId}`)
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`)
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`)
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`)
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId)
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
  return axios.post('/post', data)
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

function uploadImagesAPI(data) {
  return axios.post('/post/images', data) // formData는 JSON 으로 감싸면 안됨
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data)
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

function retweetPostAPI(data) {
  return axios.post(`/post/${data}/retweet`)
}

function* retweetPost(action) {
  try {
    const result = yield call(retweetPostAPI, action.data)
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: RETWEET_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchRetweetPost() {
  yield takeLatest(RETWEET_REQUEST, retweetPost)
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweetPost),
  ])
}
