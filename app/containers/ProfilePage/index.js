/**
 *
 * ProfilePage
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
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import "./index.scss";
import { Button, Row, Icon, Col } from 'antd';
import H1 from '../../components/H1';


/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.PureComponent {
  // logout
  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  formatTime = (time) => {
    let newTime = time.split("T")
    return newTime[0];
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <div className="profile-page">
        <Helmet>
          <title>ProfilePage</title>
          <meta name="description" content="Description of ProfilePage" />
        </Helmet>
        <Row>
          <div className="profile-page-header">
            <p className="profile-page-name">Account</p>
            <Button type="danger" className="profile-logout" onClick={this.handleLogout}>Logout <Icon type="logout" /></Button>
          </div>
        </Row>
        <Row>
          <div className="profile-page-ava">
            <img src={user.avatar} className="user-avatar" />
            <H1>{user.name}</H1>
          </div>
        </Row>
        <Row>
          <div className="profile-page-info">
            <Col span={8}>
              <p className="profile-title">Email</p>
              <p className="profile-value">{user.email}</p>
            </Col>
            <Col span={8}>
              <p className="profile-title">Role</p>
              <p className="profile-value">{user.role}</p>
            </Col>
            <Col span={8}>
              <p className="profile-title">Date Create</p>
              <p className="profile-value">{this.formatTime(user.createdAt)}</p>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
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

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
