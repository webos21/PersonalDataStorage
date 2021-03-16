import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';

// Containers
const PdsLayout = React.lazy(() => import('./containers/PdsLayout'));

// Pages
const Page500 = React.lazy(() => import('./service/Page500/Page500'));
const Login = React.lazy(() => import('./service/Login'));

const isAuthenticated = () => {
  let akey = localStorage.getItem('authKey');
  let aval = localStorage.getItem('authVal');
  return (akey !== undefined && akey !== null && aval !== undefined && aval !== null);
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
);

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/500" component={Page500} />
            <LoginRoute path="/login" component={Login} />
            <AuthenticatedRoute path="/" component={PdsLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
