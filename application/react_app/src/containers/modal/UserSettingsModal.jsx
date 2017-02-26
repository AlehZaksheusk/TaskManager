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
import { USER_SETTINGS_INPUT_TYPES } from '../../constants/inputConstants';

const $ = require('jquery');

export default class UserSettingsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      name: this.props.user.name,
    };
  }

  updateUser = () => {
    this.context.flux.actions.basic.updateItemSettings({
      type: 'users',
      data: this.state,
      id: this.props.user.id,
    });
    this.props.toggleModal();
  };

  handleOnChange = (type, value) => {
    this.setState({ [type]: value });
  };

  render() {
    return (
      <Modal
        show={this.props.isShow}
      >
        <Modal.Header>
          Update user info
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              bsClass="update-user-form"
              controlId="update-user"
            >
              {USER_SETTINGS_INPUT_TYPES.map((inputData, index) => {
                return (<FormTextInput
                  key={`reg-input-${index}`}
                  value={this.state[inputData.type]}
                  componentClass={inputData.componentClass}
                  {...inputData}
                  handleOnChange={this.handleOnChange}
                />);
              })}
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.updateUser}>Update</Button>
          <Button
            bsStyle="danger"
            onClick={() => { this.props.toggleModal(); }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

UserSettingsModal.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
