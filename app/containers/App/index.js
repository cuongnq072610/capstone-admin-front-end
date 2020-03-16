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
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import HomePage from 'containers/HomePage/Loadable';
import AddCoursePage from 'containers/AddCoursePage/Loadable';
import AddTeacherPage from 'containers/AddTeacherPage/Loadable';
import TeacherPage from 'containers/TeacherPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import StudentDashboardPage from 'containers/StudentDashboardPage/Loadable';
import StudentAddCoursePage from 'containers/StudentAddCoursePage/Loadable';
import NotePage from 'containers/NotePage/Loadable';
import NoteDetailPage from 'containers/NoteDetailPage/Loadable';
import StudentAskPage from 'containers/StudentAskPage/Loadable';
import StudentComposePage from 'containers/StudentComposePage/Loadable';
import StudentCreateAskPage from 'containers/StudentCreateAskPage/Loadable';
import HighlightPage from 'containers/HighLightPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NoteFolderPage from 'containers/NoteFolderPage/Loadable';
import HighLightFolderPage from 'containers/HighLightFolderPage/Loadable';
import GlobalStyle from '../../global-styles';

import WrapperLayout from '../../components/WrapperLayout';
// import PrivateRoute from '../../components/PrivateRoute';

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
        <Route exact path='/course' render={() => <WrapperLayout component={HomePage} role="admin" page="course"/>}/>
        <Route path='/teacher' render={() => <WrapperLayout component={TeacherPage} role="admin" page="teacher"/>}/>
        <Route path='/course/addcourse' render={() => <WrapperLayout component={AddCoursePage} role="admin" page="course"/>}/>
        <Route path='/course/addteacher' render={() => <WrapperLayout component={AddTeacherPage} role="admin" page="course"/>}/>
        <Route exact path='/student' render={() => <WrapperLayout component={StudentDashboardPage} role="student" page="student-dashboard"/>}/>
        {/* demo privateRoute */}
        {/* <PrivateRoute exact path='/student' component={<WrapperLayout component={StudentDashboardPage} role="student" page="student-dashboard"/>}/> */}
        <Route exact path='/student/addcourse' render={() => <WrapperLayout component={StudentAddCoursePage} role="student" page="student-dashboard"/>}/>
        <Route exact path='/highlight' render={() => <WrapperLayout component={HighlightPage} role="student" page="highlight"/>}/>
        <Route exact path='/highlight/:courseCode' render={() => <WrapperLayout component={HighLightFolderPage} role="student" page="highlight"/>}/>
        <Route exact path='/note' render={() => <WrapperLayout component={NotePage} role="student" page="note"/>}/>
        <Route path='/note/:noteId' render={() => <WrapperLayout component={NoteDetailPage} role="student" page="note"/>}/>
        <Route path='/folder/:courseCode' render={() => <WrapperLayout component={NoteFolderPage} role="student" page="note"/>}/>
        <Route exact path='/ask' render={() => <WrapperLayout component={StudentAskPage} role="student" page="ask"/>}/>
        <Route path='/ask/compose/:id' render={() => <WrapperLayout component={StudentComposePage} role="student" page="ask"/>}/>
        <Route path='/ask/create' render={() => <WrapperLayout component={StudentCreateAskPage} role="student" page="ask"/>}/>
        <Route path='' render={() => <WrapperLayout component={NotFoundPage}/>}/>
      </Switch>
      <GlobalStyle />
    </Layout>
  );
}
