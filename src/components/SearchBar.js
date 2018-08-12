import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';
const { Search } = Input;

const styles = {
  root: {
    margin: '8px 0',
  },
  button: {
    marginTop: 4,
  },
};

const SearchBar = ({ buttonText, name, send, size }) => {
  return (
    <Search
      style={styles.root}
      autoFocus
      placeholder={name}
      enterButton={buttonText}
      size={size}
      onSearch={value => send(value)}
    />
  );
};

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
