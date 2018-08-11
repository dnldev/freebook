import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'antd';

import strings from '../localization/app-locale';

class TableItemChooser extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  onSelectChange = selectedRowKeys => this.setState({ selectedRowKeys });

  sendChosenItems = () => {
    this.props.chooseItems(this.state.selectedRowKeys);
  };

  render() {
    const { columns, items, loading, size } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <React.Fragment>
        <Table
          columns={columns}
          dataSource={items}
          rowSelection={rowSelection}
          loading={loading}
          locale={strings.table}
          size={size}
        />

        <Button
          type="primary"
          onClick={this.sendChosenItems}
          disabled={!hasSelected}
          loading={loading}
        >
          {strings.select}
        </Button>
      </React.Fragment>
    );
  }
}

TableItemChooser.propTypes = {
  chooseItems: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string,
};

TableItemChooser.defaultProps = {
  size: 'small',
};

export default TableItemChooser;
