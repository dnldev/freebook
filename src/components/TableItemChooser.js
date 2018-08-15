import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';

import { Button, Table } from 'antd';

class TableItemChooser extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  onSelectChange = selectedRowKeys => this.setState({ selectedRowKeys });

  sendChosenItems = () => {
    this.props.chooseItems(this.state.selectedRowKeys);
  };

  render() {
    const {
      buttonText,
      columns,
      expandedRowRender,
      items,
      loading,
      size,
      tableLocale,
    } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <React.Fragment>
        <Button
          className={css(styles.button)}
          disabled={!hasSelected}
          loading={loading}
          onClick={this.sendChosenItems}
        >
          {buttonText}
        </Button>

        <Table
          columns={columns}
          dataSource={items}
          expandedRowRender={expandedRowRender}
          rowSelection={rowSelection}
          loading={loading}
          locale={tableLocale}
          size={size}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 4,
  },
});

TableItemChooser.propTypes = {
  buttonText: PropTypes.string.isRequired,
  chooseItems: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  expandedRowRender: PropTypes.func,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string,
  tableLocale: PropTypes.object,
};

TableItemChooser.defaultProps = {
  expandedRowRender: null,
  size: 'small',
  tableLocale: null,
};

export default TableItemChooser;
