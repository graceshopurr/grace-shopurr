import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
<<<<<<< HEAD
import cat from './cat'
import product from './product'

const reducer = combineReducers({user, cat, product})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware);
=======

const reducer = combineReducers({user})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)
>>>>>>> boilermaker/master

export default store
export * from './user'
