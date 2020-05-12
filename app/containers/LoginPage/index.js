/**
 *
 * LoginPage
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
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Col, Button, Row, Input, Icon, Spin, Carousel } from 'antd';
import { API_ENDPOINT } from '../../constants/apis';

import { isEmpty as _isEmpty, uniq as _isUniq } from 'lodash';
import { isRequired } from '../../utils/validation';

import './index.scss';
import NoteItText from './assets/noteit-text-1@3x.png';
import parseJwt from '../../utils/parseJWT';
import history from '../../utils/history';
import { login } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      invalidField: [],
      errMess: [],
    }
  }

  componentWillMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const isLogout = urlParams.get('logout');
    if (token) {
      localStorage.setItem("token", token);
      const parseToken = parseJwt(token);
      const user = JSON.stringify(parseToken.user);
      localStorage.setItem('user', user);
      this.navigateRightPage(JSON.parse(user).role);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.navigateRightPage(user.role);
    }
    if (isLogout) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }

  navigateRightPage = (role) => {
    switch (role) {
      case 'student':
        history.push('/student');
        break;
      case 'teacher':
        history.push('/tutor');
        break;
      case 'tempuser':
        history.push('/role');
        break;
      default:
        break;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loginPage.token !== this.props.loginPage.token &&
      prevProps.loginPage.isLoading !== this.props.loginPage.isLoading &&
      this.props.loginPage.isLoading === false &&
      _isEmpty(this.props.loginPage.error)
    ) {
      const { token } = this.props.loginPage;
      const parseToken = parseJwt(token);
      const user = JSON.stringify(parseToken.user);
      localStorage.setItem('user', user);
      switch (JSON.parse(user).role) {
        case 'admin':
          history.push('/admin');
          break;
        case 'teacher':
          history.push('/tutor');
          break;
        case 'tempuser':
          history.push('/role');
          break;
        default:
          break;
      }
    }
    if (!_isEmpty(this.props.loginPage.error) && prevProps.loginPage.error !== this.props.loginPage.error) {
      this.setState({
        errMess: this.props.loginPage.error
      })
    }
  }

  getValidation = () => {
    const { username, password } = this.state;
    const errors = {
      ...isRequired([
        { name: 'username', value: username },
        { name: 'password', value: password },
      ])
    }
    return errors
  }

  onHandleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onHandleSubmitLogin = (event) => {
    event.preventDefault();
    const errors = this.getValidation();
    if (!_isEmpty(errors)) {
      this.setState({
        invalidField: Object.keys(errors),
        errMess: _isUniq(Object.values(errors)),
      })
    } else {
      this.setState({
        invalidField: [],
        errMess: [],
      });
      const { username, password } = this.state;
      this.props.onHandleLogin(username, password);
    }
  }

  ongHandleLoginWithGg = () => {
    document.location.href = `${API_ENDPOINT}/auth/google`;
  }

  render() {
    const { isLoading, error } = this.props.loginPage;
    const { errMess } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#ffc143', marginRight: '10px' }} spin />;

    return (
      <Row className='login-page'>
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <Col span={11}>
          <div className='login-wrapper'>
            <img src={NoteItText} className='login-logo' alt='logo' />
            <p className='login-title'>Sign in to noteIt </p>
            <form className="login-field" onSubmit={this.onHandleSubmitLogin}>
              <Button className='btn-login-google' onClick={this.ongHandleLoginWithGg}><span className='google-logo'></span> Log in with Google</Button>
              <p>or</p>
              <div className='login-input-field'>
                <Input placeholder="Username or Email" type="email" className="login-input" name="username" onChange={this.onHandleChangeText} />
                <Input.Password placeholder="Password" className="login-input-pass" name="password" onChange={this.onHandleChangeText} />
                <div className='login-input-footer'>
                  <Button className='btn-signin' onClick={this.onHandleSubmitLogin}>
                    {
                      isLoading ?
                        <Spin indicator={antIcon} /> :
                        <input type="submit" value="Log in" />
                    }
                  </Button>
                  <Button className='btn-forgot'><u>Forgot password?</u></Button>
                </div>
                <p style={{ color: 'red' }}>{(errMess ? errMess : "")}</p>
              </div>
            </form>
            <div className='login-policy'>
              <p>By clicking <u>Login with Google, you agree to our Terms.</u></p>
              <p>Learn how we process your data in our <u>Privacy Policy and Cookie Policy.</u></p>
            </div>
          </div>
        </Col>
        <Col span={13}>
          <Carousel className='login-carousel' autoplay>
            <div className='login-side1'>
              <div className='div-shadow'>
                <span className='icon-note-it'></span>
                <span className='title-for-user'>For Student</span>
                <div className='icons-wrapper'>
                  <span className='icon-for-user icon-for-user__ask'></span>
                  <span className='icon-for-user icon-for-user__highlight'></span>
                  <span className='icon-for-user icon-for-user__faq'></span>
                  <span className='icon-for-user icon-for-user__note'></span>
                </div>
                <p className='p-for-user'>Highlight and take note anything from your material. Didn't get it? Asking your tutor is a click away.</p>
              </div>
            </div>

            <div className='login-side2'>
              <div className='div-shadow'>
                <span className='icon-note-it'></span>
                <span className='title-for-user'>For Teacher</span>
                <div className='icons-wrapper'>
                  <span className='icon-for-user icon-for-user__ask'></span>
                  <span className='icon-for-user icon-for-user__faq'></span>
                </div>
                <p className='p-for-user'>The simple and powerful hub to answer all of your students' questions.</p>
              </div>
            </div>

            <div className='login-side3'>
              <div className="div-shadow">
                <span className='icon-note-it'></span>
                <span className='title-for-user'>For Admin</span>
                <div className='icons-wrapper'>
                  <span className='icon-for-user icon-for-user__course'></span>
                  <span className='icon-for-user icon-for-user__department'></span>
                  <span className='icon-for-user icon-for-user__teacher'></span>
                  <span className='icon-for-user icon-for-user__report'></span>
                </div>
                <p className='p-for-user'>Manage departments, courses and teachers has never been so simple.</p>
              </div>
            </div>
          </Carousel>
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = {
  onHandleLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onHandleLogin: (email, password) => { dispatch(login(email, password)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
