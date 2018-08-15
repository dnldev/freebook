import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';

import { Col, Icon, Row } from 'antd';

const ClickableIcons = ({ clicked, iconType, labels }) => (
  <Row className={css(styles.root)} type="flex" justify="space-between">
    {labels.map((label, i) => (
      <Col key={i} xs={12} sm={8} md={6} lg={4}>
        <Icon
          className={css(styles.icon)}
          type={iconType}
          onClick={() => clicked(i)}
        />
        <p className={css(styles.label)}>{label}</p>
      </Col>
    ))}
  </Row>
);

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
  },
  icon: {
    cursor: 'pointer',
    fontSize: '5em',
    textAlign: 'center',
    width: '100%',
  },
  label: {
    textAlign: 'center',
    whiteSpace: 'pre-line',
    width: '100%',
  },
});

ClickableIcons.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  clicked: PropTypes.func.isRequired,
  iconType: PropTypes.string.isRequired,
};

export default ClickableIcons;
