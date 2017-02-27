import React from 'react';
import { Button } from 'react-bootstrap';
import ControlPanel from '../controlPanel/controlPanel';

export default class TaskItem extends React.Component {

  getDate = () => {
    const date = new Date(this.props.task.due_date);
    return date.toDateString();
  };

  render() {
    const user = this.context.getter.getUserById(this.props.task.user);
    const project = this.context.getter.getProjectById(this.props.task.project);
    const panel = this.props.isManager ?
      <ControlPanel type="tasks" task={this.props.task} /> : false;
    return (
      <div className="single-user">
        <div className="user-desc">
          <h3>Title: {this.props.task.name}</h3>
          <h6>Assigned to: {user.name}</h6>
          <h6>Project: {project.name}</h6>
          <h6>Due Date: {this.getDate()}</h6>
          <h3>Description:</h3>
          {this.props.task.description}
        </div>
        {panel}
      </div>
    );
  }
}

TaskItem.contextTypes = {
  getter: React.PropTypes.object,
};
