import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/rootReducer'
import reduxThunk from 'redux-thunk'

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));

store.subscribe(() => {
  console.log('SUBSCRIBE', store.getState());
})

export default store;