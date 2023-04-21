/** @format */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger'
import manageReducers from '../redux/manageModule'
import { productReducers } from '../redux/productModule'
import rootSaga from '../sagas/rootSaga';
import userReducers from '../redux/userModule'
const sagaMiddleware = createSagaMiddleware();
const binds = combineReducers({
  manage: manageReducers,
  product: productReducers,
  user: userReducers,
})

const store = createStore(binds, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)

export default store
