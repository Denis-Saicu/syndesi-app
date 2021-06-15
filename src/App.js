import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './App.css';
import { login, selectUser } from './features/userSlice'
import Auth from '../src/js/login/Auth';
import { auth } from './firebase'
import Home from './js/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import RequestNewPassword from './js/services/RequestNewPassword'
import { selectForgotPassword, selectChangePassword, selectActivate } from './features/servicesSlice'
import ChangePassword from './js/services/ChangePassword'
import ConfirmEmail from './js/services/ConfirmEmail'
function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const forgotPassword = useSelector(selectForgotPassword);
  const changePassword = useSelector(selectChangePassword);
  const activate = useSelector(selectActivate);

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      }
    });

    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      dispatch(
        login({
          uid: localStorage.getItem('uid'),
          photo: localStorage.getItem('photo'),
          email: localStorage.getItem('email'),
          displayName: localStorage.getItem('displayName'),
        }),
      );
    }

  }, [dispatch])

  return (
    <>
      <Router>
        <div className="app">
          <Switch>
            {user ? (
              <>
                <Route exact path="/home" component={Home} />
                <Redirect to="home" />
              </>
            ) : (
              forgotPassword ? (
                <>
                  <Route exact path="/forgot-password" component={RequestNewPassword} />
                  <Redirect to="/forgot-password" />
                </>
              ) : (
                changePassword ?
                  (
                    <>
                      <Route exact path="/reset-password" component={ChangePassword} />
                      <Redirect to="/reset-password" />
                    </>
                  ) : (activate ?
                    (
                      <>
                        <Route exact path="/activate" component={ConfirmEmail} />
                        <Redirect to="activate" />
                      </>
                    ) : (
                      <>
                        <Route exact path="/auth" component={Auth} />
                        <Redirect to="auth" />
                      </>
                    )
                )
              )
            )
            }

          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
