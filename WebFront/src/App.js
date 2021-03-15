import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';

// Containers
const PdsLayout = React.lazy(() => import('./containers/PdsLayout'));

// Pages
const Page500 = React.lazy(() => import('./service/Page500/Page500'));
const Login = React.lazy(() => import('./service/Login'));

const isAuthenticated = () => {
  let data = localStorage.getItem('X-PDS-AUTH');
  return (data !== undefined && data !== null);
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/500" component={Page500} />
            <AuthenticatedRoute path="/" component={PdsLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
