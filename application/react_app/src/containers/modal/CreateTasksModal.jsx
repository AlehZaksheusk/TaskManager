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
      description: '',
      name: '',
      due_date: '',
      user: this.props.user.id,
      project: '',
    };
  }

  componentWillMount() {
    const project = this.getDefaultProject();
    this.setState({ project });
  }

  getDefaultProject = () => {
    const projects = this.context.getter.getProjects();
    return projects[0] ? projects[0].id : false;
  };

  handleOnChange = (type, value) => {
    let localValue = value;
    if (type === 'due_date') {
      const date = new Date(parseInt(value, 10));
      localValue = date.toISOString();
    }
    this.setState({ [type]: localValue });
  };


  handleClickSubmit = () => {
    this.context.flux.actions.basic.createNewItem({
      type: 'tasks', data: this.state,
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
                defaultValue={this.props.user.id}
                choices={choices}
                type={'user'}
                handleOnChange={this.handleOnChange}
              />
              <FormSelectInput
                defaultValue={defaultProject}
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
