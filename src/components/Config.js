import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';

import { Button, Input } from 'antd';

import { camelToTitleCase } from '../utils';

const FIELD_TYPES = Object.freeze({
  TEXT: 'text',
});

class Config extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getInitialFieldValues();
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  getInitialFieldValues = () => {
    const initialValues = {};

    this.props.inputs.forEach(
      ({ fieldName, initialValue }) =>
        (initialValues[fieldName] = initialValue ? initialValue : '')
    );

    return initialValues;
  };

  sendConfig = () => this.props.send(this.state);

  render() {
    const { buttonText, inputs } = this.props;

    return (
      <div className={css(styles.root)}>
        {inputs.map(({ fieldName, fieldType }) => {
          if (fieldType === FIELD_TYPES.TEXT) {
            return (
              <Input
                key={fieldName}
                onChange={this.handleChange}
                name={fieldName}
                placeholder={camelToTitleCase(fieldName)}
                value={this.state[fieldName]}
              />
            );
          } else {
            return <div>Field Type not implemented</div>;
          }
        })}

        <Button
          className={css(styles.button)}
          type="primary"
          onClick={this.sendConfig}
        >
          {buttonText}
        </Button>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    margin: '8px 0',
  },
  button: {
    marginTop: 4,
  },
});

Config.propTypes = {
  buttonText: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      fieldType: PropTypes.oneOf(Object.values(FIELD_TYPES)).isRequired,
      initialValue: PropTypes.string,
    }).isRequired
  ),
  send: PropTypes.func.isRequired,
};

export default Config;
