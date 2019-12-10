import React from "react";
import ReactDOM from "react-dom";
import firebase from "../../utils/firebase";
import {
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_REDIRECT_URI
} from '../../utils/consts'

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
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            const response_type = 'code';
            const state = '123reddit';
            const duration = 'temporary';
            const scope = 'identity edit read privatemessages report  save submit subscribe vote history vote';
            window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=${response_type}&state=${state}&redirect_uri=${REDDIT_REDIRECT_URI}&duration=${duration}&scope=${scope}`
          })
      })
      .catch(function (error) {
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
