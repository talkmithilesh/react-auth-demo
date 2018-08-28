import React from 'react';
import { auth } from '../firebase';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { SignUpLink } from './SignUp';
import * as routes from '../constants/routes';

class SignInPage extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div>
                <h1>Sign In Page</h1>
                <SignInForm history={history}/>

                <hr />

                <SignUpLink />
            </div>
        );
    }
}

export default withRouter(SignInPage);

const INITIAL_STATE = {
    'email': '',
    'password': '',
    'error': null
};

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {...INITIAL_STATE};
    }

    onSubmit(event) {
        const {
            email,
            password,
        } = this.state;

        const {
            history
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState({ 'error': error })
            });

        event.preventDefault();

    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid = email === '' || email === ' ' || password === '' || password === ' '

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={event => this.setState({ 'email': event.target.value })}
                />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => this.setState({ 'password': event.target.value })}
                />
                <br />

                <button
                    disabled={isInvalid}
                    onSubmit={this.onSubmit}>
                    Sign In
                </button>

                {error && <div>{error.message}</div>}
            </form>
        );
    }
}

const SignInLink = () => {
    return (
        <p>
            You have an account {' '} <Link to={routes.SIGN_IN}>Sign In</Link>
        </p>
    );
}

export {
    SignInForm,
    SignInLink,
};