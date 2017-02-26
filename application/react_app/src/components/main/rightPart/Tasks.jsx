import React from 'react';
import { Button } from 'react-bootstrap';
import TaskItem from './TaskItem/TaskItem';
import CreateTasksModal from '../../../containers/modal/CreateTasksModal';

export default class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowCreateModal: false,
    };
  }

  toggleModal = () => {
    this.setState({ isShowCreateModal: !this.state.isShowCreateModal });
  };

  render() {
    const tasks = this.context.getter.getTasks();

    return (
      <div className="tasks-part">
        <Button
          bsStyle="success"
          bsSize="small"
          onClick={() => { this.toggleModal('isShowSignUp'); }}
        >
          Create new issue
        </Button>
        <CreateTasksModal
          {...this.props}
          isShowCreateModal={this.state.isShowCreateModal}
          toggleModal={this.toggleModal}
        />
        <div>
          {tasks.map((task, index) => {
            return <TaskItem key={`task-info-${index}`} task={task} {...this.props} />;
          })}
        </div>
      </div>
    );
  }
}

Tasks.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
