import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import libgen from 'libgen';

import { EbookProviderContext } from '../context';

import testData from '../testdata';

class FetchEbooksProvider extends PureComponent {
  searchResultData = testData;

  state = {
    columns: this.getColumnsArray('Title', 'Extension', 'Pages', 'Year'),
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

  // searchResultData = [];

  constructor(props) {
    super(props);

    this.state.ebooksChosen = this.ebooksChosen.bind(this);
    this.state.fetchEbookList = this.fetchEbookList.bind(this);
  }

  ebooksChosen(chosenIndexes) {
    chosenIndexes.forEach(index => console.log(this.searchResultData[index]));
  }

  fetchEbookList(searchConfig) {
    this.toggleSearchLoading();

    const { ebookName } = searchConfig;

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

  getColumnsArray(...columns) {
    return columns.map(column => {
      if (typeof column === 'object') return column;

      const columnTitle = column;
      const columnKey = column.toLowerCase();

      return {
        title: columnTitle,
        dataIndex: columnKey,
        key: columnKey,
      };
    });
  }

  parseSearchResults(data) {
    return data.map(({ title, year, extension, pages }, index) => ({
      key: index,
      title,
      extension,
      pages,
      year,
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
