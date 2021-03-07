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
import AddProfile from './component/profileForms/AddProfile'
import PrivateRoute from './component/routing/PrivateRoute'
import AddExperience from './component/profileForms/AddExperience'
import AddEducation from './component/profileForms/AddEducation'
import Profiles from './component/profiles/Profiles'
import Profile from './component/profiles/profile/Profile'
import Posts from './component/posts/Posts'
import Post from './component/post/Post'

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
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path='/create-profile' component={AddProfile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
