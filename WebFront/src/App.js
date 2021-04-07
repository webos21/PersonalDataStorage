import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import firebase from './firebase';
import routes from './routes';

import './scss/style.scss';


// Containers
const PdsLayout = React.lazy(() => import('./containers/PdsLayout'));

// Pages
const Page404 = React.lazy(() => import('./service/Page404'));
const Page500 = React.lazy(() => import('./service/Page500'));
const Logout = React.lazy(() => import('./service/Logout'));
const Login = React.lazy(() => import('./service/Login'));

const isAuthenticated = () => {
  let akey = localStorage.getItem('authKey');
  let aval = localStorage.getItem('authVal');
  return (akey !== undefined && akey !== null && aval !== undefined && aval !== null);
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  if (isAuthenticated()) {
    let routeObj = routes.find((r) => { return r.path === rest.location.pathname });
    if (routeObj) {
      let className = routeObj.name;
      firebase.analytics().logEvent("screen_view", { screen_class: className, screen_name: rest.location.pathname });
    }
  }
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
}

const LoginRoute = ({ component: Component, ...rest }) => {
  if (!isAuthenticated()) {
    firebase.analytics().logEvent("screen_view", { screen_class: 'Login', screen_name: rest.location.pathname });
  }
  return (
    <Route {...rest} render={(props) => (
      !isAuthenticated()
        ? <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
}

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/404" component={Page404} />
            <Route path="/500" component={Page500} />
            <Route path="/logout" component={Logout} />
            <LoginRoute path="/login" component={Login} />
            <AuthenticatedRoute path="/" component={PdsLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
