import {useState, useEffect} from 'react'
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/reducers/rootReducer';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = useState(
    (sessionStorage.getItem('userId') && Number(sessionStorage.getItem('userId')) !== -1) ? true : false
  );
  const [currentDashboardId, setCurrentDashboardId] = useState(
    (sessionStorage.getItem('userId') && Number(sessionStorage.getItem('userId')) !== -1) ? Number(sessionStorage.currentDashboardId) : -1
  );
  const [currentUserId, setCurrentUserId] = useState(
    (sessionStorage.getItem('userId') && Number(sessionStorage.getItem('userId')) !== -1) ? Number(sessionStorage.userId) : -1
  );
  return [loggedIn, setLoggedIn, currentDashboardId, setCurrentDashboardId, currentUserId, setCurrentUserId];
}

function App(props) {

  //TODO: 
  // Сделать edit у карты, листа и доски (изменение данных у карты, изменение названия у списка и доски)
  // Подумать над личным кабинетом - совсем TRY-HARD

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn,
    currentDashboardId, setCurrentDashboardId,
    currentUserId, setCurrentUserId] = useAuth();

  useEffect(() => {
    if (loggedIn === true && currentUserId !== -1)
      setTimeout(() => props.onStartLoad(currentUserId), 0);      
    sessionStorage.setItem('userId', String(currentUserId))
  }, [currentUserId])

  useEffect(() => {
    sessionStorage.setItem('currentDashboardId', String(currentDashboardId))
  }, [currentDashboardId]);

  // Переход на роут auth для авторизации, если пользователь не авторизован
  useEffect(() => {
    if (!loggedIn)
      navigate('/auth');
  }, [loggedIn]);

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
