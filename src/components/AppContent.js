import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

import SearchBar from './SearchBar';
import TableItemChooser from './TableItemChooser';

import strings from '../localization/app-locale';

const { Header, Content } = Layout;

const navbarHeight = 64;
const standardMargin = 8;

const styles = {
  content: {
    height: `calc(100% - ${navbarHeight}px - ${standardMargin * 2}px)`,
    margin: standardMargin,
  },
};

const AppContent = ({ context }) => {
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white' }}>
        {strings.headerTitle}
      </Header>
      <Content style={styles.content}>
        <SearchBar name={strings.ebookName} send={context.fetchEbookList} />
        <TableItemChooser
          buttonText={strings.select}
          columns={context.columns}
          chooseItems={context.ebooksChosen}
          expandedRowRender={context.expandedRowRender}
          items={context.searchResultTableData}
          loading={context.searchLoading}
          tableLocale={strings.table}
        />
      </Content>
    </Layout>
  );
};

AppContent.propTypes = {
  context: PropTypes.object.isRequired,
};

export default AppContent;
