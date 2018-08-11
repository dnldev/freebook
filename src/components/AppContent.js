import React from 'react';
import PropTypes from 'prop-types';

import TableItemChooser from './TableItemChooser';
import Config from './Config';

const AppContent = ({ context }) => {
  return (
    <React.Fragment>
      <Config inputs={context.inputs} send={context.fetchEbookList} />
      <TableItemChooser
        columns={context.columns}
        chooseItems={context.ebooksChosen}
        items={context.searchResultTableData}
        loading={context.searchLoading}
      />
    </React.Fragment>
  );
};

AppContent.propTypes = {
  context: PropTypes.object.isRequired,
};

export default AppContent;
