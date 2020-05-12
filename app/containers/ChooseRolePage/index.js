/**
 *
 * ChooseRolePage
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
import makeSelectChooseRolePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import H1 from '../../components/H1';
import H3 from '../../components/H3';

import Teacher from './assets/teacher.png';
import Student from './assets/student.png';
import Logo from './assets/noteIt-cyan.png';


import "./index.scss";
import { Button, Layout, Row, Col } from 'antd';
import { chooseRole } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ChooseRolePage extends React.PureComponent {
  handleChooseRole = (role) => {
    console.log(`your role is ${role}`)
  }

  render() {
    return (
      <div className='choose-role-page'>
        <Helmet>
          <title>ChooseRolePage</title>
          <meta name="description" content="Description of ChooseRolePage" />
        </Helmet>
        <div className='choose-role-field'>
          <Row>
            <div className='choose-role-field-head'>
              <img src={Logo} className='logo' />
              <H1 className='text'>Welcome to NoteIt</H1>
              <H3 className='text'>Please choose your role</H3>
            </div>
          </Row>
          <Row>
            <div className='choose-role-field-content'>
              <Col span={12}>
                <Button className="role-field" onClick={() => this.handleChooseRole('teacher')}>
                  <img src={Teacher} className='role-ava' />
                  <p>Teacher</p>
                </Button>
              </Col>
              <Col span={12}>
                <Button className="role-field" onClick={() => this.handleChooseRole('student')}>
                  <img src={Student} className='role-ava' />
                  <p>Student</p>
                </Button>
              </Col>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

ChooseRolePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chooseRolePage: makeSelectChooseRolePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleChooseRole: (role) => { dispatch(chooseRole(role)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'chooseRolePage', reducer });
const withSaga = injectSaga({ key: 'chooseRolePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChooseRolePage);
