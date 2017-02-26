import React from 'react';
import { Button } from 'react-bootstrap';
import Projects from './rightPart/Projects';
import Tasks from './rightPart/Tasks';
import Users from './rightPart/Users';


export default class RightPart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeType: 'users',
      isShowSignUp: false,
    };
  }

  getActiveComponent = () => {
    const tab = this.context.getter.getActiveTab();
    let component = Users;
    switch (tab) {
      case 'tasks':
        component = Tasks;
        break;
      case 'projects':
        component = Projects;
        break;
      default:
        break;
    }
    return React.createElement(component, { ...this.props });
  };

  changeActiveType = (activeType) => {
    this.context.flux.actions.basic.changeActiveTab(activeType);
  };

  render() {
    const component = this.getActiveComponent();
    return (
      <div className="right-part">
        {component}
      </div>
    );
  }
}

RightPart.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
