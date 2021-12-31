import {useState, useEffect} from 'react'

// Components
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/reducers/rootReducer';
import { Route, Routes } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

import Header from './Header'
import Dashboard from './Dashboard'
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm'

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

function useAuth() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentDashboardId, setCurrentDashboardId] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(1);
  return [loggedIn, setLoggedIn, currentDashboardId, setCurrentDashboardId, currentUserId, setCurrentUserId];
}

function App(props) {
  // Глобальное состояние несущее в себе информацию о том
  // Залогинился ли пользователь, id текущей доски и id текущего юзера
  const [loggedIn, setLoggedIn,
    currentDashboardId, setCurrentDashboardId,
    currentUserId, setCurrentUserId] = useAuth();

  // Начальная загрузка информации пользователя
  useEffect(() => {
    if (loggedIn === true && currentUserId !== -1) 
      setTimeout(() => props.onStartLoad(currentUserId), 0);
  }, [currentUserId])

  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn, currentDashboardId, setCurrentDashboardId, currentUserId, setCurrentUserId]}>
      <Styles />
        <Routes>
          <Route path={'/'} element={<><Styles /><Header /><Dashboard/></>} exact/>
          <Route path={'/auth'} element={<AuthForm/>} exact/>
          <Route path={'/register'} element={<RegisterForm/>} exact/>
        </Routes>
    </UserContext.Provider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
