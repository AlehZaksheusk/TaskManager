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
import { CREATE_ISSUE_INPUT_TYPES } from '../../constants/inputConstants';

const DateTimeField = require('react-bootstrap-datetimepicker');
const $ = require('jquery');

export default class CreateTasksModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: this.props.task.description,
      name: this.props.task.name,
      due_date: this.props.task.due_date,
      user: this.props.task.user,
    };
  }

  handleOnChange = (type, value) => {
    let localValue = value;
    if (type === 'due_date') {
      const date = new Date(parseInt(value, 10));
      localValue = date.toISOString();
    }
    this.setState({ [type]: localValue });
  };

  handleClickSubmit = () => {
    this.context.flux.actions.basic.updateItemSettings({
      type: 'tasks', data: this.state, id: this.props.task.id,
    });
    this.props.toggleModal();
  };

  render() {
    const users = this.context.getter.getUsers();
    const choices = users.map((user) => {
      return { value: user.id, label: user.name };
    });
    const projects = this.context.getter.getProjects();
    const defaultProject = projects[0] ? projects[0].id : false;
    const projectChoices = projects.map((project) => {
      return { value: project.id, label: project.name };
    });
    return (
      <Modal
        show={this.props.isShow}
      >
        <Modal.Header>
          Update task info
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              bsClass="create-task-modal"
              controlId="create-task"
            >
              {CREATE_ISSUE_INPUT_TYPES.map((inputData, index) => {
                return (
                  <FormTextInput
                    key={`reg-input-${index}`}
                    value={this.state[inputData.type]}
                    {...inputData}
                    handleOnChange={this.handleOnChange}
                  />);
              })}
              <div className="datepicker">
                <DateTimeField
                  inputFormat={'DD/MM/YY'}
                  onChange={(value) => {
                    this.handleOnChange('due_date', value);
                  }}
                />
              </div>
              <FormSelectInput
                defaultValue={this.props.task.user}
                choices={choices}
                type={'user'}
                handleOnChange={this.handleOnChange}
              />
              <FormSelectInput
                defaultValue={this.props.task.project}
                choices={projectChoices}
                type={'project'}
                handleOnChange={this.handleOnChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.handleClickSubmit}>Submit</Button>
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

CreateTasksModal.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
