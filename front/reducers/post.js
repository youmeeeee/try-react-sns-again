import shortId from 'shortid'
import faker from 'faker'
import produce from 'immer'

const initialState = {
  mainPosts: [{
    id: '1',
    User: {
      id: 1,
      nickname: 'youme',
    },
    content: 'first post #hashtag #express',
    Images: [
      {
        id: shortId.generate(),
        src: 'https://dummyimage.com/500X500/000/fff',
      },
      {
        id: shortId.generate(),
        src: 'https://dummyimage.com/500X500/e6179a/ffffff',
      },
      {
        id: shortId.generate(),
        src: 'https://dummyimage.com/500X500/17abe6/ffffff',
      },
    ],
    Comments: [
      {
        id: shortId.generate(),
        User: {
          id: shortId.generate(),
          nickname: 'stranger1',
        },
        content: 'Hello, stranger!',
      },
      {
        id: shortId.generate(),
        User: {
          id: shortId.generate(),
          nickname: 'stranger2',
        },
        content: 'Nice to see you!',
      },
    ],
  }],
  imagesPaths: [],
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

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20).fill().map(() => ({
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
  })),
)

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
  case ADD_POST_REQUEST:
    draft.addPostLoading = true
    draft.addPostDone = false
    draft.addPostError = null
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
