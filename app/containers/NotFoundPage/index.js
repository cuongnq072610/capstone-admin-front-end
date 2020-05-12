/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import H2 from 'components/H2';

import messages from './messages';
import './index.scss';
import notFoundLogo from './assets/noteIt-404.png';
import noteItCyan from './assets/noteIt-cyan.png';
import { Button } from 'antd';
import history from '../../utils/history';

export default function NotFound() {
  const user = JSON.parse(localStorage.getItem('user'));

  const goToDashboard = (user) => {
    if (user) {
      switch (user.role) {
        case 'admin':
          history.push("/admin")
          break;
        case 'student':
          history.push("/student")
          break;
        case 'teacher':
          history.push("/tutor")
          break;
        default:
          break;
      }
    } else {
      history.push('/');
    }
  }

  return (
    <div className='not-found-page'>
      <div className='not-found-wrapper'>
        <img src={notFoundLogo} className='not-found-logo' />
        <H1 className='warning' style={{ fontWeight: '900' }}><FormattedMessage {...messages.head} /></H1>
        <H2 className='warning'><FormattedMessage {...messages.body} /></H2>
        <Button className='box-warning' onClick={() => goToDashboard(user)}>
          <img src={noteItCyan} className='note-logo' />
          <p className='box-p'><FormattedMessage {...messages.footer} /></p>
        </Button>
      </div>
    </div>
  );
}
