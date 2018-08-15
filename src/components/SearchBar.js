import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';

import { Input } from 'antd';
const { Search } = Input;

const SearchBar = ({ buttonText, name, send, size }) => {
  return (
    <Search
      className={css(styles.root)}
      autoFocus
      placeholder={name}
      enterButton={buttonText}
      size={size}
      onSearch={value => send(value)}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    margin: '8px 0',
  },
});

SearchBar.propTypes = {
  buttonText: PropTypes.string,
  name: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['default', 'small', 'large']),
};

SearchBar.defaultProps = {
  buttonText: null,
  size: 'default',
};

export default SearchBar;
