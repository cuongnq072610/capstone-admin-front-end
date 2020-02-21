/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';
import 'antd/dist/antd.css';

import HomePage from 'containers/HomePage/Loadable';
import AddCoursePage from 'containers/AddCoursePage/Loadable';
import AddTeacherPage from 'containers/AddTeacherPage/Loadable';
import TeacherPage from 'containers/TeacherPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import StudentAskPage from 'containers/StudentAskPage/Loadable';
import StudentComposePage from 'containers/StudentComposePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';

import WrapperLayout from '../../components/WrapperLayout';

export default function App() {
  return (
    <Layout>
      <Helmet
        titleTemplate="%s - Smart Course Management Admin"
        defaultTitle="Smart Course Management Admin"
      >
        <meta name="description" content="Smart Course Management Admin" />
      </Helmet>
      <Switch>
        <Route exact path='/' render={() => <WrapperLayout component={DashboardPage} role="admin" />}/>
        <Route path='/course' render={() => <WrapperLayout component={HomePage} role="admin" />}/>
        <Route path='/teacher' render={() => <WrapperLayout component={TeacherPage} role="admin"/>}/>
        <Route path='/addcourse' render={() => <WrapperLayout component={AddCoursePage} role="admin"/>}/>
        <Route path='/addteacher' render={() => <WrapperLayout component={AddTeacherPage} role="admin"/>}/>
        <Route path='' render={() => <WrapperLayout component={NotFoundPage}/>}/>
      </Switch>
      <GlobalStyle />
    </Layout>
  );
}
