import produce from 'immer'

const initialState = {
  mainPosts: [],
  singlePost: null,
  imagesPaths: [],
  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: false,
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
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: false,
  retweetLoading: false,
  retweetDone: false,
  retweetError: false,
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

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST'
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS'
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE'

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST'
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS'
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE'

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

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

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const RETWEET_REQUEST = 'RETWEET_REQUEST'
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS'
export const RETWEET_FAILURE = 'RETWEET_FAILURE'

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST' // 동기 액션
// export const REMOVE_IMAGE_SUCCESS = 'REMOVE_IMAGE_SUCCESS'
// export const REMOVE_IMAGE_FAILURE = 'REMOVE_IMAGE_FAILURE'

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

// 이전  상태를 액션을 통해 다음상태로 만들어 내는 함수 (불변성을 지키면서)
const postReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
  case LOAD_POST_REQUEST:
    draft.loadPostLoading = true
    draft.loadPostDone = false
    draft.loadPostError = null
    break
  case LOAD_POST_SUCCESS:
    draft.loadPostLoading = false
    draft.loadPostDone = true
    draft.singlePost = action.data
    break
  case LOAD_POST_FAILURE:
    draft.loadPostLoading = false
    draft.loadPostError = action.error
    break
  case LOAD_USER_POSTS_REQUEST:
  case LOAD_HASHTAG_POSTS_REQUEST:
  case LOAD_POSTS_REQUEST:
    draft.loadPostsLoading = true
    draft.loadPostsDone = false
    draft.loadPostsError = null
    break
  case LOAD_USER_POSTS_SUCCESS:
  case LOAD_HASHTAG_POSTS_SUCCESS:
  case LOAD_POSTS_SUCCESS:
    draft.loadPostsLoading = false
    draft.loadPostsDone = true
    console.log('@@@action.data', action.data)
    draft.mainPosts = draft.mainPosts.concat(action.data)
    console.log('@@Draft.mainPosts', draft.mainPosts)
    draft.hasMorePost = action.data.length === 10
    break
  case LOAD_USER_POSTS_FAILURE:
  case LOAD_HASHTAG_POSTS_FAILURE:
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
    draft.imagesPaths = []
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
  case UPLOAD_IMAGES_REQUEST:
    draft.uploadImagesLoading = true
    draft.uploadImagesDone = false
    draft.uploadImagesError = null
    break
  case UPLOAD_IMAGES_SUCCESS: {
    draft.imagesPaths = action.data
    draft.uploadImagesLoading = false
    draft.uploadImagesDone = true
    break
  }
  case UPLOAD_IMAGES_FAILURE:
    draft.uploadImagesLoading = false
    draft.uploadImagesError = action.error
    break
  case RETWEET_REQUEST:
    draft.retweetLoading = true
    draft.retweetDone = false
    draft.retweetError = null
    break
  case RETWEET_SUCCESS: {
    draft.mainPosts.unshift(action.data)
    draft.retweetLoading = false
    draft.retweetDone = true
    break
  }
  case RETWEET_FAILURE:
    draft.retweetLoading = false
    draft.retweetError = action.error
    break
  case REMOVE_IMAGE_REQUEST:
    draft.imagesPaths = draft.imagesPaths.filter((v, i) => i !== action.data) // 이미지는 프론트에서만 지우는것으로!
    break
  default:
    break
  }
})

export default postReducer
