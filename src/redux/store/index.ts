import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import manageReducers from '../manageModule';
import productReducers from '../productModule';
import userReducers from '../userModule';
import chatReducers from '../chatModule';
import rootSaga from '../sagas/rootSaga';


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    manage: manageReducers,
    product: productReducers,
    user: userReducers,
    chat: chatReducers
});

export type RootState = ReturnType<typeof rootReducer>;

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;
