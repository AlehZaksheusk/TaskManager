import React from 'react';
import { Modal, Button, FormControl, TextInput, FormGroup } from 'react-bootstrap';
import FormTextInput from '../../containers/inputs/FormTextInput';
import FormSelectInput from '../../containers/inputs/FormSelectInput';
import {
  USER_SETTINGS_INPUT_TYPES,
  USER_POSITION_CHOICES,
} from '../../constants/inputConstants';

const $ = require('jquery');

export default class UserSettingsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      name: this.props.user.name,
      is_manager: this.props.user.is_manager,
    };
  }

  getTextInputs = () => {
    return USER_SETTINGS_INPUT_TYPES.map((inputData, index) =>
      (<FormTextInput
        key={`upd-input-${index}`}
        value={this.state[inputData.type]}
        componentClass={inputData.componentClass}
        {...inputData}
        handleOnChange={this.handleOnChange}
      />),
    );
  };

  updateUser = () => {
    console.log(this.state);
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
              {this.getTextInputs()}
              <FormSelectInput
                defaultValue={this.props.user.is_manager}
                choices={USER_POSITION_CHOICES}
                type={'is_manager'}
                handleOnChange={this.handleOnChange}
                isBool
              />
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
};
