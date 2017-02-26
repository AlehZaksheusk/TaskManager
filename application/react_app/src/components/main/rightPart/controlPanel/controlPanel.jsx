import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import UserSettingsModal from '../../../../containers/modal/UserSettingsModal';
import UpdateTaskModal from '../../../../containers/modal/UpdateTaskModal';
import UpdateProjectModal from '../../../../containers/modal/UpdateProjectModal';

export default class controlPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }

  deleteItem = () => {
    let payload = {};
    switch (this.props.type) {
      case 'users':
        payload = { type: 'users', id: this.props.user.id };
        break;
      case 'tasks':
        payload = { type: 'tasks', id: this.props.task.id };
        break;
      case 'projects':
        payload = { type: 'projects', id: this.props.project.id };
        break;
      default:
        break;
    }
    this.context.flux.actions.basic.deleteItem(payload);
  };

  handleClickUpdate = () => {
    this.setState({ isShowModal: !this.state.isShowModal });
  };

  render() {
    let modal = false;
    switch (this.props.type) {
      case 'users':
        modal = (
          <UserSettingsModal
            isShow={this.state.isShowModal}
            toggleModal={this.handleClickUpdate}
            user={this.props.user}
          />);
        break;
      case 'tasks':
        modal = (
          <UpdateTaskModal
            isShow={this.state.isShowModal}
            toggleModal={this.handleClickUpdate}
            task={this.props.task}
          />
        );
        break;
      case 'projects':
        modal = (
          <UpdateProjectModal
            isShow={this.state.isShowModal}
            toggleModal={this.handleClickUpdate}
            project={this.props.project}
          />
        );
        break;
      default:
        break;
    }

    return (
      <div className="control-panel">
        {modal}
        <Button bsSize="small" bsStyle="success" onClick={this.handleClickUpdate}>Update</Button>
        <Button bsSize="small" bsStyle="danger" onClick={this.deleteItem}>Delete</Button>
      </div>
    );
  }
}

controlPanel.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
