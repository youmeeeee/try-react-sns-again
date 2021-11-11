import shortId from 'shortid'
import faker from 'faker'
import produce from 'immer'

const initialState = {
  mainPosts: [],
  imagesPaths: [],
  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  removePostLoading: false,
  removePostDone: false,
  removePostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
}

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Comments: [{
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentence(),
  }],
  Images: [{
    src: faker.image.image(),
  }],
}))

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
})

export const removePost = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
})

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

const dummyPost = (data) => ({
  id: data.id,
  content: data.conent,
  User: {
    id: 1,
    nickname: 'youme',
  },
  Images: [],
  Comments: [],
})

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'youme',
  },
})

// 이전  상태를 액션을 통해 다음상태로 만들어 내는 함수 (불변성을 지키면서)
const postReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
  case LOAD_POSTS_REQUEST:
    draft.loadPostsLoading = true
    draft.loadPostsDone = false
    draft.loadPostsError = null
    break
  case LOAD_POSTS_SUCCESS:
    draft.loadPostsLoading = false
    draft.loadPostsDone = true
    draft.mainPosts = draft.mainPosts.concat(action.data)
    draft.hasMorePost = draft.mainPosts.length < 50
    break
  case LOAD_POSTS_FAILURE:
    draft.loadPostsLoading = false
    draft.loadPostsError = action.error
    break
  case ADD_POST_REQUEST:
    draft.loadPostsLoading = true
    draft.loadPostsDone = false
    draft.loadPostsError = null
    break
  case ADD_POST_SUCCESS:
    draft.addPostLoading = false
    draft.addPostDone = true
    draft.mainPosts.unshift(dummyPost(action.data))
    break
  case ADD_POST_FAILURE:
    draft.addPostLoading = false
    draft.addPostError = action.error
    break
  case REMOVE_POST_REQUEST:
    draft.removePostLoading = true
    draft.removePostDone = false
    draft.removePostError = null
    break
  case REMOVE_POST_SUCCESS:
    draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data)
    draft.removePostLoading = false
    draft.removePostDone = true
    break
  case REMOVE_POST_FAILURE:
    draft.removePostLoading = false
    draft.removePostError = action.error
    break
  case ADD_COMMENT_REQUEST:
    draft.addCommentLoading = true
    draft.addCommentDone = false
    draft.addCommentError = null
    break
  case ADD_COMMENT_SUCCESS: {
    const post = draft.mainPosts.find((v) => v.id === action.data.postId)
    post.Comments.unshift(dummyComment(action.data.content))
    draft.addCommentLoading = false
    draft.addCommentDone = true
    break
  }
  case ADD_COMMENT_FAILURE:
    draft.addCommentLoading = false
    draft.addCommentError = action.error
    break
  default:
    break
  }
})

export default postReducer
