import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from './utils/firebase';
import SecureRoute from "./components/SecureRoute/SecureRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Portal from './pages/Portal/Portal';
import SignUp from "./pages/SignIn/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Signout from './pages/Signout/Signout';
import WithAuthListener from "./decorators/WithAuthListener";
import './app.scss';

function App(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // listen to auth status change
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setIsLoading(false);
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);
  return isLoading ? null : (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SignIn} />
          <SecureRoute path={"/portal"} component={Portal} />
          <SecureRoute path={"/dashboard"} component={Dashboard} />
          <SecureRoute path={'/signout'} component={Signout} />
          <Route path="*" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
