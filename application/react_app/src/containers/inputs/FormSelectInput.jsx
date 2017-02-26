import React, { Component, PropTypes } from 'react';
import {
  FormControl,
} from 'react-bootstrap';

export default class FormInput extends Component {

  render() {
    return (
      <FormControl
        componentClass="select"
        onChange={
          (e) => { this.props.handleOnChange(this.props.type, parseInt(10, e.target.value)); }
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
