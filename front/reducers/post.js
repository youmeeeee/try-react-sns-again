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
  likePostLoading: false,
  likePostDone: false,
  likePostError: false,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: false,
}

// export const generateDummyPost = (number) => Array(number).fill().map(() => ({
//   id: shortId.generate(),
//   User: {
//     id: shortId.generate(),
//     nickname: faker.name.findName(),
//   },
//   content: faker.lorem.paragraph(),
//   Comments: [{
//     User: {
//       id: shortId.generate(),
//       nickname: faker.name.findName(),
//     },
//     content: faker.lorem.sentence(),
//   }],
//   Images: [{
//     src: faker.image.image(),
//   }],
// }))

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

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
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
    draft.mainPosts.unshift(action.data)
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
    draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId)
    draft.removePostLoading = false
    draft.removePostDone = true
    break
  case REMOVE_POST_FAILURE:
    draft.removePostLoading = false
    draft.removePostError = action.error
    break
  case LIKE_POST_REQUEST:
    draft.likePostLoading = true
    draft.likePostDone = false
    draft.likePostError = null
    break
  case LIKE_POST_SUCCESS: {
    const post = draft.mainPosts.find((v) => v.id === action.data.postId)
    post.Likers.push({ id: action.data.userId })
    draft.likePostLoading = false
    draft.likePostDone = true
    break
  }
  case LIKE_POST_FAILURE:
    draft.likePostLoading = false
    draft.likePostError = action.error
    break
  case UNLIKE_POST_REQUEST:
    draft.unlikePostLoading = true
    draft.unlikePostDone = false
    draft.unlikePostError = null
    break
  case UNLIKE_POST_SUCCESS: {
    const post = draft.mainPosts.find((v) => v.id === action.data.postId)
    post.Likers = post.Likers.filter((v) => v.id !== action.data.userId)
    draft.unlikePostLoading = false
    draft.unlikePostDone = true
    break
  }
  case UNLIKE_POST_FAILURE:
    draft.unlikePostLoading = false
    draft.unlikePostError = action.error
    break
  default:
    break
  }
})

export default postReducer
