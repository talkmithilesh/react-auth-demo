import React from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { SignInLink } from './SignIn'

class SignUpPage extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div>
                <h1>Sign Up</h1>
                <SignUpForm history={history}/>

                <hr />
                <SignInLink />
            </div>
        );
    }
}

export default withRouter(SignUpPage);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('sign up called ---->')
        const {
            email,
            passwordOne,
        } = this.state;

        const { history } = this.props;
        
        console.log('email: ' + email + 'Password: ' + passwordOne);

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                console.log('sign up comleted ---->')
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState({ 'error': error })
            });
                    
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    value={username}
                    placeholder="Full Name"
                    onChange={event => this.setState({ 'username': event.target.value })}
                />
                <br />

                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={event => this.setState({ 'email': event.target.value })}
                />
                <br />

                <input
                    type="password"
                    value={passwordOne}
                    placeholder="Password"
                    onChange={event => this.setState({ 'passwordOne': event.target.value })}
                />
                <br />

                <input
                    type="password"
                    value={passwordTwo}
                    placeholder="Confirm Password"
                    onChange={event => this.setState({ 'passwordTwo': event.target.value })}
                />
                <br />

                <button disabled={isInvalid} type="submit">
                    SignUp
                </button>
                <br />

                {error && <div>{error.message}</div>}
            </form >
        );
    }
}

const SignUpLink = () => {
    return (
        <p>
            Don't have an account? {' '} <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
    );
};

export {
    SignUpForm,
    SignUpLink,
};