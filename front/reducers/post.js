const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'youme'
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
                    nickname: 'stranger1'
                },
                content: 'Hello, stranger!'
            },
            { 
                User: {
                    nickname: 'stranger2'
                },
                content: 'Nice to see you!'
            },
        ]
    }],
    imagesPaths: [],
    postAdded: false
}

const ADD_POST = 'ADD_POST'
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    content: 'dummy data',
    User: {
        id: 1,
        nickname: 'youme'
    },
    Images: [],
    Comments: []
}

// (이전  상태, 액션) => 다음상태
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        default:
            return state
    }
}

export default postReducer