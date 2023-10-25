
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import manageReducers from '../manageModule';
import productReducers from '../productModule';
import userReducers from '../userModule';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const binds = combineReducers({
    manage: manageReducers,
    product: productReducers,
    user: userReducers,
});

const store = createStore(binds, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

export default store;
