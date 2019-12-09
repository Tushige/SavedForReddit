import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SecureRoute from "./components/SecureRoute";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import WithAuthListener from "./decorators/WithAuthListener";

function App(props) {
  return (
    <div className="App">
      <Router>
        <WithAuthListener>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <SecureRoute path={"/dashboard"} component={Dashboard} />
            <Route path="*" component={SignUp} />
          </Switch>
        </WithAuthListener>
      </Router>
    </div>
  );
}

export default App;
