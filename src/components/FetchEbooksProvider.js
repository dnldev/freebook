import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import libgen from 'libgen';

import { EbookProviderContext } from '../context';

import testData from '../testdata';

class FetchEbooksProvider extends PureComponent {
  searchResultData = testData;

  state = {
    columns: this.getColumnsArray('Title', 'Author', 'Extension'),
    downloadLoading: false,
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

  mirror = '';
  selectedFiles = [];

  // searchResultData = [];

  constructor(props) {
    super(props);

    this.state.bulkDownload = this.bulkDownload.bind(this);
    this.state.downloadFile = this.downloadFile.bind(this);
    this.state.ebooksChosen = this.ebooksChosen.bind(this);
    this.state.fetchEbookList = this.fetchEbookList.bind(this);
  }

  componentDidMount() {
    this.setMirror();
  }

  bulkDownload() {
    this.toggleDownloadLoading();
    Promise.all(this.selectedFiles.map((_, i) => this.downloadFile(i)))
      .then(() => this.toggleDownloadLoading())
      .catch(err => console.log(err));
  }

  downloadFile(index) {
    const openLinkInNewTab = link => window.open(link, '_blank');
    const selectedFile = this.selectedFiles[index];
    console.log(selectedFile);

    return new Promise((resolve, reject) =>
      axios
        .get(this.mirror + '/get.php?md5=' + selectedFile.md5)
        .then(response => {
          const link = this.getLink(response.data);

          openLinkInNewTab(link);

          resolve();
        })
        .catch(err => reject(err))
    );
  }

  ebooksChosen(chosenIndexes) {
    chosenIndexes.forEach(index => {
      const { title, extension, md5 } = this.searchResultData[index];
      if (!this.fileSelected(md5)) {
        this.selectedFiles.push({ title, extension, md5 });
      }
    });

    this.setState({
      fileLabels: this.getFileLabels(),
    });
  }

  fileSelected = md5Search =>
    !!this.selectedFiles.find(({ md5 }) => md5 === md5Search);

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

  getLink(responseData) {
    const beforeLink = "<a href='";
    const afterLink = "'><h2>GET</h2>";

    return responseData.slice(
      responseData.search(beforeLink) + beforeLink.length,
      responseData.search(afterLink)
    );
  }

  parseSearchResults(data) {
    return data.map((entry, index) => ({
      key: index,
      ...entry,
    }));
  }

  setMirror = () =>
    libgen.mirror((err, url) => {
      if (err) console.log(err);

      this.mirror = url;
    });

  toggleDownloadLoading = () => this.toggleStateBool('downloadLoading');

  toggleSearchLoading = () => this.toggleStateBool('searchLoading');

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
