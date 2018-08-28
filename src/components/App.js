import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import ForgetPasswordPage from './ForgetPassword';
import HomePage from './Home';
import AccountPage from './Account';
import * as routes from '../constants/routes';
import { firebase } from '../firebase'

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      authUser: null,
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser}/>
          <hr />
          
          <Route exact path={routes.LANDING}
           component={() => <LandingPage/>}
          />

          <Route exact path={routes.SIGN_UP}
           component={() => <SignUpPage/>}
          />

          <Route exact path={routes.SIGN_IN}
           component={() => <SignInPage/>}
          />

          <Route exact path={routes.PASSWORD_FORGET}
           component={() => <ForgetPasswordPage/>}
          />

          <Route exact path={routes.HOME}
           component={() => <HomePage/>}
          />

          <Route exact path={routes.ACCOUNT}
           component={() => <AccountPage/>}
          />
        </div>

      </Router>
    );
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser !== null) {
        this.setState({authUser})
      } else {
        this.setState({authUser: null})
      }
    });
  }
}

export default App;
