import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { SETTINGS_TYPES } from '../../constants/leftPartConstants';

export default class LeftPart extends React.Component {

  changeActiveTab = (activeTab) => {
    this.context.flux.actions.basic.changeActiveTab(activeTab);
  };

  render() {
    return (
      <div className="left-part">
        <div className="menu-left-group">
          <ButtonGroup vertical>
            {SETTINGS_TYPES.map((item, index) => {
              return (
                <Button
                  key={`lpb-${index}`}
                  bsSize="large"
                  bsStyle="success"
                  onClick={() => { this.changeActiveTab(item.type); }}
                >
                  {item.label}
                </Button>);
            })}
            <Button
              bsSize="large"
              bsStyle="danger"
              onClick={this.props.logoutApp}
            >
              Logout
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

LeftPart.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
