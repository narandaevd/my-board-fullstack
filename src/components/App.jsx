import React from 'react'

// Components
import Header from './Header'
import Dashboard from './Dashboard'

import { createGlobalStyle } from 'styled-components';

const Styles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #F5F5F5; 
  }
`

function App() {
  return (
    <React.Fragment>
      <Styles />
      <Header />
      <Dashboard />
    </React.Fragment>
  );
}

export default App;
