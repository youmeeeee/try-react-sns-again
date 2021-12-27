import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import post from './post'

// (이전  상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
  // redux SSR을 위해서 HYDRATE가 필요
  // getSeverSideProps에서 실행한 결과를 HYDRATE로 보내준다.
  case HYDRATE:
    // console.log('HYDRATE', action)
    return action.payload
  default: {
    const combinedReducer = combineReducers({
      user,
      post,
    })
    return combinedReducer(state, action)
  }
  }
}

export default rootReducer
