import React from 'react';
import PropTypes from 'prop-types';

import { Col, Icon, Row } from 'antd';

const styles = {
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
};

const ClickableIcons = ({ clicked, iconType, labels }) => (
  <Row style={styles.root} type="flex" justify="space-between">
    {labels.map((label, i) => (
      <Col key={i} xs={12} sm={8} md={6} lg={4}>
        <Icon style={styles.icon} type={iconType} onClick={() => clicked(i)} />
        <p style={styles.label}>{label}</p>
      </Col>
    ))}
  </Row>
);

ClickableIcons.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  clicked: PropTypes.func.isRequired,
  iconType: PropTypes.string.isRequired,
};

export default ClickableIcons;
