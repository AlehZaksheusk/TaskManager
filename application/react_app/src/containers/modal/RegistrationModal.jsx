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
import { REGISTER_INPUT_TYPES, REGISTRATION_KEYS } from '../../constants/inputConstants';
import { register } from '../../utils/authUtils';

const $ = require('jquery');

export default class RegistrationModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password1: '',
      password2: '',
      position: 'dev',
    };
  }

  getCanSignUpStatus = () => {
    let isCanSignUp = true;
    REGISTRATION_KEYS.forEach((key) => {
      if (!this.state[key]) {
        isCanSignUp = false;
      }
    });
    if (this.state.error) {
      isCanSignUp = false;
    }
    return isCanSignUp;
  };

  handleOnChange = (type, value) => {
    this.setState({ [type]: value, error: false });
  };

  signUp = () => {
    let callback;
    if (this.props.isDashboard) {
      callback = (data) => {
        this.context.flux.actions.basic.changeStoreFlag({ flag: 'users', data });
      };
    }
    const error = register({
      email: this.state.email,
      name: this.state.name,
      password1: this.state.password1,
      password2: this.state.password2,
      position: this.state.position,
    }, callback);
    if ($.isEmptyObject(error)) {
      this.props.toggleModal('isShowSignUp');
    } else {
      this.setState({ error });
    }
  };

  render() {
    const isCanSignUp = this.getCanSignUpStatus();

    return (
      <Modal
        show={this.props.isShowSignUp}
      >
        <Modal.Header>
          Enter your information
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              bsClass="register-form"
              controlId="registration"
            >
              {REGISTER_INPUT_TYPES.map((inputData, index) => {
                return (<FormTextInput
                  key={`reg-input-${index}`}
                  value={this.state[inputData.type]}
                  {...inputData}
                  handleOnChange={this.handleOnChange}
                />);
              })}
              <FormControl
                componentClass="select"
                onChange={(e) => { this.handleOnChange('position', e.target.value); }}
              >
                <option value="dev">Developer</option>
                <option value="manager">Manager</option>
              </FormControl>
              <HelpBlock>{this.state.error}</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="success"
            disabled={!isCanSignUp}
            onClick={isCanSignUp ? this.signUp : null}
          >
            Sign up
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => { this.props.toggleModal('isShowSignUp'); }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

RegistrationModal.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};

