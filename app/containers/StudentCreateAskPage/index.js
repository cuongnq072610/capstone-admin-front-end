/**
 *
 * StudentCreateAskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentCreateAskPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class StudentCreateAskPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>StudentCreateAskPage</title>
          <meta
            name="description"
            content="Description of StudentCreateAskPage"
          />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

StudentCreateAskPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentCreateAskPage: makeSelectStudentCreateAskPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'studentCreateAskPage', reducer });
const withSaga = injectSaga({ key: 'studentCreateAskPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentCreateAskPage);
