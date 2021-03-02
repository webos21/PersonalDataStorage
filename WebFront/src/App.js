import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';

// Containers
const PdsLayout = React.lazy(() => import('./containers/PdsLayout'));

// Pages
const Page500 = React.lazy(() => import('./service/Page500/Page500'));
const Login = React.lazy(() => import('./service/Login'));

const isAuthenticated = () => {
  let cookies = new Cookies();
  let data = cookies.get('X-PDS-AUTH');
  // console.log(data);
  return (data !== undefined && data !== null);
}

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <UnauthenticatedRoute exact path="/login" name="Login Page" component={Login} />
            <AuthenticatedRoute path="/" name="Home" component={PdsLayout} />
            <Route exact path="/500" name="Page 500" component={Page500} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
