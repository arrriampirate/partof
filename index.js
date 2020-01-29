import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import {connectRouter, ConnectedRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {Route, Switch} from 'react-router-dom';
import user from './store/reducers/user';
import users from './store/reducers/users';
import flows from './store/reducers/flows';

import Layout from './layout';
import Header from './layout/Header';
import Dashboard from './pages/dashboard';
import Posts from './pages/posts';
import Post from './pages/post';
import Blank from './pages/blank';
import Users from './pages/users';

import './../css/styles.styl';
import User from "./pages/user";
import UserAdd from "./pages/user-add";

const history = createBrowserHistory({basename: '/s/bureau/'});
const reducers = history => combineReducers({
  router: connectRouter(history),
  user,
  users,
  flows,
});

const initialState = window['__INITIAL_STATE__'];
const store = createStore(
  reducers(history),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Header/>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/blank/" component={Blank}/>
          <Route exact path="/posts/" component={Posts}/>
          <Route exact path="/posts/:id/" component={Post}/>
          <Route exact path="/users/" component={Users}/>
          <Route exact path="/users/:id" component={User}/>
          <Route exact path="/users-add/" component={UserAdd}/>
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);