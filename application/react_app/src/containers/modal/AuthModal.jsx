import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Button,
  FormControl,
  TextInput,
  ControlLabel,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';
import FormTextInput from '../../containers/inputs/FormTextInput';
import { LOGIN_INPUT_TYPES } from '../../constants/inputConstants';
import { makeAuthToken } from '../../utils/authUtils';

const $ = require('jquery');

export default class AuthModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: false,
      password: false,
      error: false,
    };
  }

  getValidationState = () => {
    let status = 'warning';
    const email = this.state.email;
    const password = this.state.password;
    if ((!email && !password) || this.state.error) {
      status = 'error';
    } else if (email && password) {
      status = 'success';
    }
    return status;
  };

  signIn = () => {
    const error = makeAuthToken(this.state.email, this.state.password);
    if ($.isEmptyObject(error)) {
      this.props.toggleModal('isShowSignIn');
    } else {
      this.setState({ error });
    }
  };

  handleOnChange = (type, value) => {
    this.setState({ [type]: value, error: false });
  };

  render() {
    return (
      <Modal
        show={this.props.isShowSignIn}
      >
        <Modal.Header>
          Enter your information
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              bsClass="login-form"
              controlId="login"
              validationState={this.getValidationState()}
            >
              {LOGIN_INPUT_TYPES.map((inputData, index) => {
                return (<FormTextInput
                  key={`reg-input-${index}`}
                  value={this.state[inputData.type]}
                  {...inputData}
                  handleOnChange={this.handleOnChange}
                />);
              })}
              <HelpBlock>{this.state.error}</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.signIn}>Sign in</Button>
          <Button
            bsStyle="danger"
            onClick={() => { this.props.toggleModal('isShowSignIn'); }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
