/** @format */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import productReducers from '../redux/productModule'
import userReducers from '../redux/userModule'
const binds = combineReducers({
  product: productReducers,
  user: userReducers,
})

const store = createStore(binds, applyMiddleware(thunk, logger))
export default store
