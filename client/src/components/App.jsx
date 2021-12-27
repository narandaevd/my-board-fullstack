import {useEffect, Fragment} from 'react'

// Components
import Header from './Header'
import Dashboard from './Dashboard'
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/reducers/rootReducer';


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

function App(props) {

  useEffect(() => {
    setTimeout(() => props.onStartLoad(), 0);
  }, [])

  return (
    <Fragment>
      <Styles />
      <Header />
      <Dashboard/>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
