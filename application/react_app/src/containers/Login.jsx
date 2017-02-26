import React, { Component, PropTypes } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import LoginHeader from '../components/login/LoginHeader';
import '../assets/stylesheets/main.scss';

export default class Login extends Component {

  render() {
    return (
      <div className="main-page">
        <div>
          <h1 className="login-headline">LeverX Task Manager</h1>
          <LoginHeader {...this.props} />
        </div>
      </div>
    );
  }
}
