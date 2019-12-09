import React from 'react'
import ReactDOM from 'react-dom'
import firebase from '../utils/firebase';

class SignUp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.setInput = this.setInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setInput(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    isValidPassword() {
        return this.state.password && (this.state.password === this.state.confirmPassword);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.isValidPassword()) {
            return;
        }
        console.log('signin up')
        // sign up user on firebase
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(e => {
            console.error(e);
        });
    }
    onLogin(res) {
         // get token and verify
         sessionStorage.setItem('userValidatedToken', res.data.token);
        //  setTimeout(() => this.props.history.push('/dashboard'), 800);
    }
    render() {
        return (
            <>
                <h1>Sign up!</h1>
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={this.state.email} onChange={this.setInput}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.setInput}></input>
                    
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.setInput}></input>
                    
                    <input type='submit'></input>
                </form>
            </>
        )
    }
}

export default SignUp;