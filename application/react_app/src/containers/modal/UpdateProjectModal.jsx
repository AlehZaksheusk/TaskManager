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
import FormSelectInput from '../../containers/inputs/FormSelectInput';
import { CREATE_PROJECT_INPUT_TYPES } from '../../constants/inputConstants';

const $ = require('jquery');

export default class UpdateProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.project.name,
      user: this.props.project.user,
    };
  }

  updateProject = () => {
    this.context.flux.actions.basic.updateItemSettings({
      type: 'projects',
      data: this.state,
      id: this.props.project.id,
    });
    this.props.toggleModal();
  };

  handleOnChange = (type, value) => {
    this.setState({ [type]: value });
  };

  render() {
    const users = this.context.getter.getUsers();
    const choices = users.map((user) => {
      return { value: user.id, label: user.name };
    });
    return (
      <Modal
        show={this.props.isShow}
      >
        <Modal.Header>
          Update project info
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              bsClass="update-user-form"
              controlId="update-user"
            >
              {CREATE_PROJECT_INPUT_TYPES.map((inputData, index) => {
                return (
                  <FormTextInput
                    key={`reg-input-${index}`}
                    value={this.state[inputData.type]}
                    componentClass={inputData.componentClass}
                    {...inputData}
                    handleOnChange={this.handleOnChange}
                  />);
              })}
              <FormSelectInput
                placeholder={'Select user'}
                choices={choices}
                type={'user'}
                handleOnChange={this.handleOnChange}
                multiple
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.updateProject}>Update</Button>
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

UpdateProjectModal.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
