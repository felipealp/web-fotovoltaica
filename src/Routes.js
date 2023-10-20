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
  Signup as SignUpView,
  ConfirmSignup as ConfirmSignUpView,
  SendCode as SendCodeView,
  ForgotPassword as ForgotPasswordView,
  ResetPassword as ResetPasswordView,
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
        path="/confirm-signup/:id"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={ConfirmSignUpView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/send-code"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SendCodeView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/forgot-password"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={ForgotPasswordView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/reset-password/:code"
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={ResetPasswordView}
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
