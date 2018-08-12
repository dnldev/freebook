import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import libgen from 'libgen';

import { EbookProviderContext } from '../context';

import testData from '../testdata';

import { bytesInMBs } from '../utils';

class FetchEbooksProvider extends PureComponent {
  searchResultData = testData;

  state = {
    columns: this.getColumnsArray('Title', 'Author', 'Extension'),
    expandedRowRender: this.expandedRowRender,
    fileLabels: [],
    inputs: [
      {
        fieldName: 'ebookName',
        fieldType: 'text',
        initialValue: 'Clean Code',
      },
    ],
    // searchResultTableData: [],
    searchResultTableData: this.parseSearchResults(this.searchResultData),
    searchLoading: false,
  };

  selectedFiles = [];

  // searchResultData = [];

  constructor(props) {
    super(props);

    this.state.ebooksChosen = this.ebooksChosen.bind(this);
    this.state.fetchEbookList = this.fetchEbookList.bind(this);
    this.state.fileClicked = this.fileClicked.bind(this);
  }

  ebooksChosen(chosenIndexes) {
    this.selectedFiles = chosenIndexes.map(index => {
      const { title, extension, md5 } = this.searchResultData[index];
      return { title, extension, md5 };
    });

    this.setState({
      fileLabels: this.getFileLabels(),
    });
  }

  expandedRowRender(record) {
    return (
      <React.Fragment>
        <p style={{ margin: 0 }}>Author: {record.author}</p>
        <p style={{ margin: 0 }}>Size: {bytesInMBs(record.filesize)} MB</p>
        <p style={{ margin: 0 }}>Year: {record.year}</p>
      </React.Fragment>
    );
  }

  fetchEbookList(ebookName) {
    this.toggleSearchLoading();

    const options = {
      mirror: 'http://libgen.io',
      query: ebookName,
      search_in: 'title',
      count: 20,
    };

    libgen.search(options, (err, data) => {
      if (err) {
        console.error(err);
      }

      if (data) {
        this.searchResultData = data;
        console.log(this.searchResultData);
        this.setState(
          {
            searchResultTableData: this.parseSearchResults(data),
          },
          () => this.toggleSearchLoading()
        );
      }
    });
  }

  fileClicked(index) {
    console.log(this.selectedFiles[index]);
  }

  getColumnsArray(...columns) {
    return columns.map(column => {
      if (typeof column === 'object') return column;

      const columnTitle = column;
      const columnKey = column.toLowerCase();

      return {
        title: columnTitle,
        dataIndex: columnKey,
        key: columnKey,
        sorter: (a, b) => {
          if (a[columnKey] === b[columnKey]) return 0;

          return a[columnKey] < b[columnKey] ? -1 : 1;
        },
      };
    });
  }

  getFileLabels() {
    return Object.values(this.selectedFiles).map(
      ({ extension, title }) => `${title.slice(0, 20)}...\n(${extension})`
    );
  }

  parseSearchResults(data) {
    return data.map((entry, index) => ({
      key: index,
      ...entry,
    }));
  }

  toggleSearchLoading() {
    this.toggleStateBool('searchLoading');
  }

  toggleStateBool = key =>
    this.setState(prevState => ({ [key]: !prevState[key] }));

  render() {
    return (
      <EbookProviderContext.Provider value={this.state}>
        {this.props.children}
      </EbookProviderContext.Provider>
    );
  }
}

FetchEbooksProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default FetchEbooksProvider;
