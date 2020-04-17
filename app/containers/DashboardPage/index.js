/**
 *
 * DashboardPage
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
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import "./index.scss";
import Box from './box/box';
import { loadAdminStatistic } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      statistic: {}
    }
  }

  componentDidMount() {
    this.props.handleFetchAdminStatistic();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dashboardPage.statistic !== this.props.dashboardPage.statistic) {
      const { statistic } = this.props.dashboardPage;
      this.setState({
        statistic,
      })
    }
  }

  handleNavigate = (type) => {
    switch (type) {
      case 'course':
        this.props.history.push({
          pathname: '/course',
        })
        break;
      case 'teacher':
        this.props.history.push({
          pathname: '/teacher',
        })
        break;
      default:
        break;
    }
  }

  render() {
    const { statistic } = this.state;
    const { isLoadingStatistic } = this.props.dashboardPage
    return (
      <div>
        <Helmet>
          <title>DashboardPage</title>
          <meta name="description" content="Description of DashboardPage" />
        </Helmet>
        <div className="dashboard-wrapper">
          <div className="dashboard-header">
            <p className="dashboard-title"><FormattedMessage {...messages.header} /></p>
          </div>
          <div className="dashboard-box">
            <Box name="Course" onNavigate={() => this.handleNavigate('course')} isLoading={isLoadingStatistic} statistic={statistic} />
            <Box name="Teacher" onNavigate={() => this.handleNavigate('teacher')} isLoading={isLoadingStatistic} statistic={statistic} />
          </div>
          <div className="dashboard-content">
            <div className="dashboard-des">
              <h1>
                <FormattedMessage {...messages.title} />
              </h1>
              <p>
                <FormattedMessage {...messages.content} />
              </p>
            </div>
            <div className="content-background"></div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  handleFetchAdminStatistic: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleFetchAdminStatistic: () => { dispatch(loadAdminStatistic()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardPage);
