import React from "react";
import ReactDOM from "react-dom";
import firebase from "../utils/firebase";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.setInput = this.setInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.login();
  }
  login() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <h1>Sign In!</h1>
        <form id="signup-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.setInput}></input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.setInput}
          ></input>

          <input type="submit"></input>
        </form>
      </>
    );
  }
}

export default SignIn;
