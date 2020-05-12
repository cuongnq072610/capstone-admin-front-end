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
import { Button, Layout, Row, Col, Icon, Spin } from 'antd';
import { chooseRole } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ChooseRolePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      errMess: "",
    }
  }

  handleChoose = (role) => {
    this.setState({
      role
    })
    console.log(`your role is ${role}`)
  }

  handleSubmit = () => {
    const { role } = this.state;

    if (!role || role === "") {
      this.setState({
        errMess: "Please choose your role",
      })
    } else {
      this.setState({
        errMess: "",
      })
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(`check = ${role} + ${user.email}`);
      this.props.handleChooseRole(role, user.email)
    }
  }

  render() {
    const { role, errMess } = this.state;
    const { isLoading, error } = this.props.chooseRolePage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#ffc143', marginRight: '10px' }} spin />;

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
                <div className={`role-field ${role === 'teacher' ? "role-field__active" : ""}`} onClick={() => this.handleChoose('teacher')}>
                  <img src={Teacher} className='role-ava' />
                  <p>Teacher</p>
                </div>
              </Col>
              <Col span={12}>
                <div className={`role-field ${role === 'student' ? "role-field__active" : ""}`} onClick={() => this.handleChoose('student')}>
                  <img src={Student} className='role-ava' />
                  <p>Student</p>
                </div>
              </Col>
            </div>
          </Row>
          <Row>
            <div className='choose-role-field-footer'>
              <Button type='primary' onClick={this.handleSubmit}>
                {
                  isLoading ?
                    <Spin indicator={antIcon} /> :
                    <span>That's good for now</span>
                }
              </Button>
              <p className='err-msg'>{errMess || error}</p>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

ChooseRolePage.propTypes = {
  handleChooseRole: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chooseRolePage: makeSelectChooseRolePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleChooseRole: (role, email) => { dispatch(chooseRole(role, email)) },
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
