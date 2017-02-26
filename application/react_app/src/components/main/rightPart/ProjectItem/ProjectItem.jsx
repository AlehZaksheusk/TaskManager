import React from 'react';
import { Button } from 'react-bootstrap';
import ControlPanel from '../controlPanel/controlPanel';


export default class ProjectItem extends React.Component {

  render() {
    const users = this.context.getter.getUsers();
    const panel = this.props.isManager ?
      <ControlPanel type="projects" project={this.props.project} /> : false;
    return (
      <div className="single-user">
        <div className="user-desc">
          <h2>Project: {this.props.project.name}</h2>
          Assigned to: {users.map((user) => {
            let retValue;
            if (this.props.project.user.indexOf(user.id) !== -1) {
              retValue = user.name;
            }
            return retValue;
          })}
        </div>
        {panel}
      </div>
    );
  }
}

ProjectItem.contextTypes = {
  getter: React.PropTypes.object,
};
