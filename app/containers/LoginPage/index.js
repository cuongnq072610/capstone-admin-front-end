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
import { Col, Button, Row, Input, Icon } from 'antd';
import { API_ENDPOINT } from '../../constants/apis';

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
    }
  }

  componentWillMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem("token", token);
      const parseToken = parseJwt(token);
      const user = JSON.stringify(parseToken.user);
      localStorage.setItem('user', user);
      switch (JSON.parse(user).role) {
        case 'student':
          console.log(`go here`)
          history.push('/student');
          break;
        case 'teacher':
          history.push('/teacher');
          break;
        default:
          break;
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loginPage.token !== this.props.loginPage.token) {
      const { token } = this.props.loginPage;
      localStorage.setItem("token", token);
      const parseToken = parseJwt(token);
      const user = JSON.stringify(parseToken.user);
      localStorage.setItem('user', user);
      switch (JSON.parse(user).role) {
        case 'admin':
          history.push('/admin');
          break;
        case 'teacher':
          history.push('/teacher');
          break;
        default:
          break;
      }
    }
  }

  onHandleChangeText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onHandleSubmitLogin = () => {
    const { username, password } = this.state;
    this.props.onHandleLogin(username, password);
  }

  ongHandleLoginWithGg = () => {
    document.location.href = `${API_ENDPOINT}/auth/google`;
  }

  render() {
    const { isLoading } = this.props.loginPage;
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
            <div className="login-field">
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
                        "Sign in"
                    }
                  </Button>
                  <Button className='btn-forgot'><u>Forgot password?</u></Button>
                </div>
              </div>
            </div>
            <div className='login-policy'>
              <p>By clicking <u>Login with Google, you agree to our Terms.</u></p>
              <p>Learn how we process your data in our <u>Privacy Policy and Cookie Policy.</u></p>
            </div>
          </div>
        </Col>
        <Col span={13}>
          <div className='login-side'>

          </div>
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
