import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducer from '../reducers'

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    console.log(action)
    // if (typeof action === 'function') {
    //     return action(dispatch, getState)
    // }
    return next(action)
}

const configureStore = () => {
    const middlewares = [loggerMiddleware, thunkMiddleware] 
    const enhancer = process.env.NODE_ENV === 'production' 
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    return store
}

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'dvelopement'
})

export default wrapper