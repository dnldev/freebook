import React, { Component } from 'react';

import AppContent from './components/AppContent';
import FetchEbooksProvider from './components/FetchEbooksProvider';

import { EbookProviderContext } from './context';

class App extends Component {
  render() {
    return (
      <FetchEbooksProvider>
        <EbookProviderContext.Consumer>
          {context => <AppContent context={context} />}
        </EbookProviderContext.Consumer>
      </FetchEbooksProvider>
    );
  }
}

export default App;
