/**
 *
 * AddTeacherPage
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
import makeSelectAddTeacherPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class AddTeacherPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>AddTeacherPage</title>
          <meta name="description" content="Description of AddTeacherPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AddTeacherPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addTeacherPage: makeSelectAddTeacherPage(),
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

const withReducer = injectReducer({ key: 'addTeacherPage', reducer });
const withSaga = injectSaga({ key: 'addTeacherPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddTeacherPage);
