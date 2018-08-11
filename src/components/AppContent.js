import React from 'react';
import PropTypes from 'prop-types';

import ListItemChooser from './ListItemChooser';
import Config from './Config';

const AppContent = ({ context }) => {
  return (
    <React.Fragment>
      <Config inputs={context.inputs} send={context.fetchEbookList} />
      <ListItemChooser
        chooseItem={context.ebookChosen}
        items={context.searchResults}
      />
    </React.Fragment>
  );
};

AppContent.propTypes = {
  context: PropTypes.object.isRequired,
};

export default AppContent;
