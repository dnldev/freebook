import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';

import { Col, Icon, Row } from 'antd';

const ClickableIcon = ({ clickEvent, iconType, label }) => (
  <Col xs={12} sm={8} md={6} lg={4}>
    <Icon className={css(styles.icon)} type={iconType} onClick={clickEvent} />
    <p className={css(styles.label)}>{label}</p>
  </Col>
);

const ClickableIcons = ({ clickEvent, iconType, labels }) => (
  <Row className={css(styles.root)} type="flex" justify="space-between">
    {labels.map((label, i) => (
      <ClickableIcon
        key={i}
        clickEvent={() => clickEvent(i)}
        iconType={iconType}
        label={labels[i]}
      />
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

ClickableIcon.propTypes = {
  clickEvent: PropTypes.func.isRequired,
  iconType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

ClickableIcons.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  clickEvent: PropTypes.func.isRequired,
  iconType: PropTypes.string.isRequired,
};

export default ClickableIcons;
