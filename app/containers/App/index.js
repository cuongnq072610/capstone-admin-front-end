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
import NotePage from 'containers/NotePage/Loadable';
import NoteDetailPage from 'containers/NoteDetailPage/Loadable';
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
        <Route exact path='/' render={() => <WrapperLayout component={DashboardPage} role="admin" page="dashboard"/>}/>
        <Route path='/course' render={() => <WrapperLayout component={HomePage} role="admin" page="course"/>}/>
        <Route path='/teacher' render={() => <WrapperLayout component={TeacherPage} role="admin" page="teacher"/>}/>
        <Route path='/addcourse' render={() => <WrapperLayout component={AddCoursePage} role="admin" page="course"/>}/>
        <Route path='/addteacher' render={() => <WrapperLayout component={AddTeacherPage} role="admin" page="course"/>}/>
        <Route exact path='/note' render={() => <WrapperLayout component={NotePage} role="student" page="note"/>}/>
        <Route path='/note/:noteId' render={() => <WrapperLayout component={NoteDetailPage} role="student" page="note"/>}/>
        <Route path='/ask' render={() => <WrapperLayout component={StudentAskPage} role="student" page="ask"/>}/>
        <Route path='/compose' render={() => <WrapperLayout component={StudentComposePage} role="student" page="ask"/>}/>
        <Route path='' render={() => <WrapperLayout component={NotFoundPage}/>}/>
      </Switch>
      <GlobalStyle />
    </Layout>
  );
}
