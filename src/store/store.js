import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/rootReducer'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware()));

export default store;