import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import { composeWithDevTools } from 'redux-devtools-extension';

import cat from './cat'
import product from './product'

const reducer = combineReducers({user, cat, product})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, composeWithDevTools(middleware));

export default store
export * from './user'
export * from './cat'
export * from './product'
