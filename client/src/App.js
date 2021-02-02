import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './component/layout/Header'
import Landing from './component/layout/Landing'
import Alert from './component/layout/Alert'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
