import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite';

import { Button, Layout } from 'antd';

import ClickableIcons from './ClickableIcons';
import SearchBar from './SearchBar';
import TableItemChooser from './TableItemChooser';

import strings from '../localization/app-locale';

import { bytesInMBs } from '../utils';

const { Header, Content } = Layout;

const AppContent = ({ context }) => {
  const tableExpandedRowRender = record => (
    <React.Fragment>
      <p className={css(styles.expandedRowParagraph)}>
        Language: {record.language}
      </p>
      <p className={css(styles.expandedRowParagraph)}>Pages: {record.pages}</p>
      <p className={css(styles.expandedRowParagraph)}>
        Size: {bytesInMBs(record.filesize)} MB
      </p>
      <p className={css(styles.expandedRowParagraph)}>Year: {record.year}</p>
    </React.Fragment>
  );

  return (
    <Layout>
      <Header className={css(styles.header)}>{strings.headerTitle}</Header>
      <Content className={css(styles.content)}>
        <SearchBar name={strings.ebookName} send={context.fetchEbookList} />
        <Button
          loading={context.downloadLoading}
          onClick={context.bulkDownload}
        >
          {strings.bulkDownload}
        </Button>
        <ClickableIcons
          clickEvent={context.downloadFile}
          iconType="file"
          labels={context.fileLabels}
        />

        <TableItemChooser
          buttonText={strings.select}
          columns={context.columns}
          chooseItems={context.ebooksChosen}
          expandedRowRender={tableExpandedRowRender}
          items={context.searchResultTableData}
          loading={context.searchLoading}
          tableLocale={strings.table}
        />
      </Content>
    </Layout>
  );
};

const navbarHeight = 64;
const standardMargin = 8;

const styles = StyleSheet.create({
  content: {
    height: `calc(100% - ${navbarHeight}px - ${standardMargin * 2}px)`,
    margin: standardMargin,
  },
  expandedRowParagraph: { margin: 0 },
  header: { backgroundColor: 'white' },
});

AppContent.propTypes = {
  context: PropTypes.object.isRequired,
};

export default AppContent;
