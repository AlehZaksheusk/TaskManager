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

export default class CreateProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: this.props.user.id,
    };
  }

  handleOnChange = (type, value) => {
    this.setState({ [type]: value });
  };

  createProject = () => {
    this.context.flux.actions.basic.createNewItem({
      type: 'projects', data: this.state,
    });
  };

  render() {
    const users = this.context.getter.getUsers();
    const choices = users.map((user) => {
      return { value: user.id, label: user.name };
    });
    return (
      <Modal
        show={this.props.isShowCreateModal}
      >
        <Modal.Header>
          Create new issue
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              bsClass="create-task-modal"
              controlId="create-task"
            >
              {CREATE_PROJECT_INPUT_TYPES.map((inputData, index) => {
                return (<FormTextInput
                  key={`reg-input-${index}`}
                  value={this.state[inputData.type]}
                  {...inputData}
                  handleOnChange={this.handleOnChange}
                />);
              })}
              <FormSelectInput
                defaultValue={this.props.user.id}
                choices={choices}
                type={'user'}
                handleOnChange={this.handleOnChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.createProject}>Create</Button>
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

CreateProjectModal.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
