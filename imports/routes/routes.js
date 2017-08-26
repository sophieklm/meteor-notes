import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const unathenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    Session.set('selectedNoteId', nextState.params.id);
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unathenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if(isUnauthenticatedPage && isAuthenticated) {
    browserHistory.push('/dashboard');
  };
  if(isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push('/');
  };
};
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length -1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};
export const routes = (
  <Router history={browserHistory}>
    <div>
      <Route onEnter={globalOnEnter} onChange={globalOnChange} >
        <Route exact path="/" component={Login} privacy="unauth" onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} privacy="unauth" onEnter={onEnterPublicPage}/>
        <Route path="/dashboard" component={Dashboard} privacy="auth" onEnter={onEnterPrivatePage}/>
        <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </div>
  </Router>
);
