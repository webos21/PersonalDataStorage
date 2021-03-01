import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import Cookies from 'universal-cookie';

import {
  CFooter as AppFooter,
  CHeader as AppHeader,
  CSidebar as AppSidebar,
  CSidebarFooter as AppSidebarFooter,
  CSidebarForm as AppSidebarForm,
  CSidebarHeader as AppSidebarHeader,
  CSidebarMinimizer as AppSidebarMinimizer,
  CBreadcrumb as AppBreadcrumb,
  CSidebarNav as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const PbFooter = React.lazy(() => import('./PdsFooter'));
const PbHeader = React.lazy(() => import('./PdsHeader'));

class PbLayout extends Component {

  loading() {
    return (
      <div className="animated fadeIn pt-1 text-center">Loading...</div>
    )
  }

  signOut(e) {
    e.preventDefault()

    let cookies = new Cookies();
    cookies.remove('X-PDS-AUTH');
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <PbHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <PbFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default PbLayout;
