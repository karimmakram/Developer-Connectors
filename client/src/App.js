import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './component/layout/Header'
import Landing from './component/layout/Landing'
import Alert from './component/layout/Alert'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import { loadUser } from './redux/auth/action'
import setAuthToken from './helper/setAuthToken'
import Dashboard from './component/dashboard/Dashboard'
import Profile from './component/profileForms/Profile'
import PrivateRoute from './component/routing/PrivateRoute'


if (localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path='/create-profile' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
