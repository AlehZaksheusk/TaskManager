import React, { Component, PropTypes } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import RegistrationModal from '../../containers/modal/RegistrationModal';
import AuthModal from '../../containers/modal/AuthModal';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowSignUp: false,
      isShowSignIn: false,
    };
  }

  toggleModal = (type) => {
    this.setState({
      [type]: !this.state[type],
    });
  };

  render() {
    return (
      <div className="login-button-block">
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => { this.toggleModal('isShowSignUp'); }}
        >
          Sign up
        </Button>
        <Button
          bsStyle="info"
          bsSize="large"
          onClick={() => { this.toggleModal('isShowSignIn'); }}
        >
          Sign in
        </Button>
        <RegistrationModal
          {...this.props}
          isShowSignUp={this.state.isShowSignUp}
          toggleModal={this.toggleModal}
        />
        <AuthModal
          {...this.props}
          isShowSignIn={this.state.isShowSignIn}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}
