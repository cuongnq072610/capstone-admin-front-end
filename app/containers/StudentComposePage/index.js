/**
 *
 * StudentComposePage
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
import makeSelectStudentComposePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class StudentComposePage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>StudentComposePage</title>
          <meta
            name="description"
            content="Description of StudentComposePage"
          />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

StudentComposePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentComposePage: makeSelectStudentComposePage(),
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

const withReducer = injectReducer({ key: 'studentComposePage', reducer });
const withSaga = injectSaga({ key: 'studentComposePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentComposePage);
