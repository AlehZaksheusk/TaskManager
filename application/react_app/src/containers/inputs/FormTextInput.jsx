import React, { Component, PropTypes } from 'react';
import {
  FormControl,
} from 'react-bootstrap';

const $ = require('jquery');

export default class FormInput extends Component {

  render() {
    return (
      <FormControl
        value={this.props.value}
        componentClass={this.props.componentClass}
        ref={(input) => { this.input = input; }}
        placeholder={this.props.placeholder}
        onChange={(e) => { this.props.handleOnChange(this.props.type, e.target.value); }}
      />
    );
  }
}
