import React from 'react';
import PropTypes from 'prop-types';

import { Col, Icon, Row } from 'antd';

const styles = {
  root: {
    marginTop: 8,
  },
  icon: {
    fontSize: '5em',
  },
};

const ClickableIcons = ({ clicked, iconType, labels }) => (
  <Row style={styles.root}>
    {labels.map((filename, i) => (
      <Col key={i} span={6}>
        <Icon style={styles.icon} type={iconType} onClick={() => clicked(i)} />
        <p style={{ align: 'center' }}>{filename}</p>
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
