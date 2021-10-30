const initialState = {
    mainPosts: []
}

// (이전  상태, 액션) => 다음상태
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CASE':
            break
        default:
            return state
    }
}

export default postReducer