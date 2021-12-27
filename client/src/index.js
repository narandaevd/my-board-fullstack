import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store/store'
import { Provider } from 'react-redux'

const application = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(application, document.getElementById('root'));