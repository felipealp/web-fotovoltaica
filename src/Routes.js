import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from './WithLayout.js';

// Available layouts
import {
  Main as MainLayout
} from './layouts';

// public pages
import {
  Home as HomeView,
  Contact as ContactView,
  About as AboutView,
  Login as LoginView,
  Simulator as SimulatorView,
  Signup as SignUpView,
} from './views';


const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={HomeView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/login"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={LoginView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/simulator"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SimulatorView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/signup"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SignUpView}
            layout={MainLayout}
          />
        )}
      />

      <Route
        exact
        path="/contact"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={ContactView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/about"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={AboutView}
            layout={MainLayout}
          />
        )}
      />
  

      <Redirect to="/page-not-found" />
    </Switch>
  );
};

export default Routes;
