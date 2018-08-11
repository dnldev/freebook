import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import levenSort from 'leven-sort';
import libgen from 'libgen';

import { EbookProviderContext } from '../context';

class FetchEbooksProvider extends PureComponent {
  state = {
    inputs: [
      {
        fieldName: 'ebookName',
        fieldType: 'text',
      },
    ],
    searchResults: [],
  };

  constructor(props) {
    super(props);

    this.state.ebookChosen = this.ebookChosen.bind(this);
    this.state.fetchEbookList = this.fetchEbookList.bind(this);
  }

  ebookChosen(chosenIndex) {
    console.log(this.state.searchResults[chosenIndex]);
  }

  fetchEbookList(searchConfig) {
    const { ebookName } = searchConfig;

    const options = {
      mirror: 'http://libgen.io',
      query: ebookName,
      search_in: 'title',
    };

    libgen.search(options, (err, data) => {
      if (err) {
        console.error(err);
      }

      if (data) {
        const sortedData = levenSort(data, ebookName, 'title');
        this.setState({
          searchResults: this.parseSearchResults(sortedData),
        });
      }
    });
  }

  parseSearchResults(data) {
    return data.map(entry => `${entry.title} (${entry.extension})`);
  }

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
