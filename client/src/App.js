import React, { Component } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import store from "./config/configStore";
import ProtectedRoute from "./routes/protectedRoute";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ToastContainer />
        <Router>
          <Switch>
            {routes.map(route => {
              const RenderedRoute = route.protected ? ProtectedRoute : Route;
              return <RenderedRoute key={route.path} {...route} />;
            })}
            <Route component={() => <h6>Not found</h6>} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
