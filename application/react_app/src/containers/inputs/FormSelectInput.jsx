import React, { Component, PropTypes } from 'react';
import {
  FormControl,
} from 'react-bootstrap';

export default class FormSelectInput extends Component {

  handleOnChange = (e) => {
    let value = e.target.value;
    if (!this.props.isBool) {
      value = parseInt(value, 10);
    }
    this.props.handleOnChange(this.props.type, value);
  };

  render() {
    return (
      <FormControl
        componentClass="select"
        onChange={
          (e) => { this.handleOnChange(e); }
        }
      >
        {this.props.choices.map((item, index) => {
          return (
            <option
              selected={item.value === this.props.defaultValue}
              key={index}
              value={item.value}
            >
              {item.label}
            </option>);
        })}
      </FormControl>
    );
  }
}
