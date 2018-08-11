import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';

class ListItemChooser extends PureComponent {
  render() {
    const { chooseItem, items } = this.props;

    return (
      <List
        size="large"
        bordered
        dataSource={items}
        renderItem={(item, i) => (
          <List.Item onClick={() => chooseItem(i)} key={i}>
            {item}
          </List.Item>
        )}
      />
    );
  }
}

ListItemChooser.propTypes = {
  chooseItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default ListItemChooser;
