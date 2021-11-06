import shortId from 'shortid'

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
        src: 'https://dummyimage.com/500X500/000/fff',
      },
      {
        src: 'https://dummyimage.com/500X500/e6179a/ffffff',
      },
      {
        src: 'https://dummyimage.com/500X500/17abe6/ffffff',
      },
    ],
    Comments: [
      {
        User: {
          nickname: 'stranger1',
        },
        content: 'Hello, stranger!',
      },
      {
        User: {
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
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
})

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'youme',
  },
  Images: [],
  Comments: [],
})

// (이전  상태, 액션) => 다음상태
const postReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_POST_REQUEST:
    return {
      ...state,
      addPostLoading: true,
      addPostDone: false,
      addPostError: null,
    }
  case ADD_POST_SUCCESS:
    return {
      ...state,
      mainPosts: [dummyPost(action.data), ...state.mainPosts],
      addPostLoading: false,
      addPostDone: true,
    }
  case ADD_POST_FAILURE:
    return {
      ...state,
      addPostLoading: false,
      addPostError: action.error,
    }
  case ADD_COMMENT_REQUEST:
    return {
      ...state,
      addCommentLoading: true,
      addCommentDone: false,
      addCommentError: null,
    }
  case ADD_COMMENT_SUCCESS:
    return {
      ...state,
      addCommentLoading: false,
      addCommentDone: true,
    }
  case ADD_COMMENT_FAILURE:
    return {
      ...state,
      addCommentLoading: false,
      addCommentError: action.error,
    }
  default:
    return state
  }
}

export default postReducer
