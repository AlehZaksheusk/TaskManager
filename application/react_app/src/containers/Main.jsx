import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { logout } from '../utils/authUtils';
import LeftPart from '../components/main/LeftPart';
import RightPart from '../components/main/RightPart';

export default class Main extends React.Component {

  static childContextTypes = {
    getter: React.PropTypes.object,
    flux: React.PropTypes.object,
  };

  getChildContext() {
    return {
      getter: this.props.getter,
      flux: this.props.flux,
    };
  }

  componentDidMount() {
    const flux = this.props.flux;
    this.setStateFromFluxStore = function () {
      this.setState(this.getStateFromFlux());
    }.bind(this);
    _.forEach(['main'], (store) => {
      flux.store(store).on('change', this.setStateFromFluxStore);
    });
  }

  componentWillUnmount() {
    const flux = this.props.flux;
    _.forEach(['main'], (store) => {
      flux.store(store).removeListener('change', this.setStateFromFluxStore);
    });
  }

  getStateFromFlux = () => {
    return this.props.flux.store('main').getAppState();
  };

  logoutApp = () => {
    logout();
  };

  render() {
    return (
      <div className="main-page">
        <div className="content-part">
          <LeftPart logoutApp={this.logoutApp} />
          <RightPart {...this.props} />
        </div>
      </div>
    );
  }
}
