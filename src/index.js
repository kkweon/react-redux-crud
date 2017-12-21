import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reducers from "./reducers";

import ReduxPromise from "redux-promise";

import Navigation from "./components/Navigation.jsx";
import PostsIndex from "./components/PostsIndex";
import PostsNew from "./components/PostsNew.jsx";
import PostShow from "./components/PostShow.jsx";

const store = createStore(reducers, applyMiddleware(ReduxPromise));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Navigation />
        <div className="container">
          <Switch>
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/:id" component={PostShow} />
            <Route path="/" component={PostsIndex} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
