import React from 'react';
import { Button } from 'react-bootstrap';
import UserItem from './UserItems/UserItem';
import RegistrationModal from '../../../containers/modal/RegistrationModal';

export default class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowSignUp: false,
    };
  }

  toggleModal = () => {
    this.setState({ isShowSignUp: !this.state.isShowSignUp });
  };

  render() {
    const users = this.context.getter.getUsers();
    return (
      <div className="users-part">
        <Button
          bsStyle="success"
          bsSize="small"
          onClick={() => { this.toggleModal('isShowSignUp'); }}
        >Create new user</Button>
        <RegistrationModal
          {...this.props}
          isShowSignUp={this.state.isShowSignUp}
          toggleModal={this.toggleModal}
          isDashboard
        />
        <div>
          {users.map((user, index) => {
            return (
              <UserItem
                key={`user-info-${index}`}
                user={user}
                isManager={this.props.isManager}
              />);
          })}
        </div>
      </div>
    );
  }
}

Users.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
