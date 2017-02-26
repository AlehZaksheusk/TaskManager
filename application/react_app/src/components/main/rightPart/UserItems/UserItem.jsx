import React from 'react';
import { Button } from 'react-bootstrap';
import ControlPanel from '../controlPanel/controlPanel';

export default class UserItem extends React.Component {

  render() {
    const position = this.props.user.is_manager ? 'Manager' : 'Developer';
    const panel = this.props.isManager ?
      <ControlPanel type="users" user={this.props.user} /> : false;
    return (
      <div className="single-user">
        <div className="user-desc">
          <h2>{position} {this.props.user.name}</h2>
          <h3>Email: {this.props.user.email}</h3>
        </div>
        {panel}
      </div>
    );
  }
}
