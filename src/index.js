import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.render(application, document.getElementById('root'));