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
  case REMOVE_POST_REQUEST:
    return {
      ...state,
      removePostLoading: true,
      removePostDone: false,
      removePostError: null,
    }
  case REMOVE_POST_SUCCESS:
    return {
      ...state,
      mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
      removePostLoading: false,
      removePostDone: true,
    }
  case REMOVE_POST_FAILURE:
    return {
      ...state,
      removePostLoading: false,
      removePostError: action.error,
    }
  case ADD_COMMENT_REQUEST:
    return {
      ...state,
      addCommentLoading: true,
      addCommentDone: false,
      addCommentError: null,
    }
  case ADD_COMMENT_SUCCESS: {
    const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)
    const post = { ...state.mainPosts[postIndex] }
    post.Comments = [dummyComment(action.data.content), ...post.Comments]
    const mainPosts = [...state.mainPosts]
    mainPosts[postIndex] = post
    return {
      ...state,
      mainPosts,
      addCommentLoading: false,
      addCommentDone: true,
    }
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
