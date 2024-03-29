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
import '../../assets/css/app.css'
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
import FAQPage from 'containers/FaqPage/Loadable';

//teacher's page
import TeacherAskPage from 'containers/TeacherAskPage/Loadable';
import TeacherComposePage from 'containers/TeacherComposePage/Loadable';
import TeacherDashboardPage from 'containers/TeacherDashboardPage/Loadable'

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NoteFolderPage from 'containers/NoteFolderPage/Loadable';
import HighLightFolderPage from 'containers/HighLightFolderPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import DepartmentPage from 'containers/DepartmentPage/Loadable'
import ReportPage from 'containers/ReportPage/Loadable';
import ChooseRolePage from 'containers/ChooseRolePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';


import GlobalStyle from '../../global-styles';

import WrapperLayout from '../../components/WrapperLayout';
import PrivateRoute from '../../components/PrivateRoute';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Layout>
      <Helmet
        titleTemplate="%s - NoteIt Management Side"
        defaultTitle="NoteIt Management Side"
      >
        <meta name="description" content="NoteIt Management Side" />
      </Helmet>
      <Switch>
        <Route exact path='/' render={() => <LoginPage />} />
        <PrivateRoute exact path='/role' component={() => <ChooseRolePage />} />
        <PrivateRoute exact path='/profile' component={() => user ? <WrapperLayout component={ProfilePage} role={user.role} page="ask" /> : <NotFoundPage />} />
        {/* STUDENT */}
        <PrivateRoute exact path='/student' component={() => user && user.role === 'student' ? <WrapperLayout component={StudentDashboardPage} role={user.role} page="dashboard" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/student/addcourse' component={() => user && user.role === 'student' ? <WrapperLayout component={StudentAddCoursePage} role={user.role} page="dashboard" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/highlight' component={() => user && user.role === 'student' ? <WrapperLayout component={HighlightPage} role={user.role} page="highlight" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/highlight/:courseCode' component={() => user && user.role === 'student' ? <WrapperLayout component={HighLightFolderPage} role={user.role} page="highlight" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/note' component={() => user && user.role === 'student' ? <WrapperLayout component={NotePage} role={user.role} page="note" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/note/:noteId' component={() => user && user.role === 'student' ? <WrapperLayout component={NoteDetailPage} role={user.role} page="note" /> : <NotFoundPage />} />
        <PrivateRoute path='/note/folder/:courseCode' component={() => user && user.role === 'student' ? <WrapperLayout component={NoteFolderPage} role={user.role} page="note" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/ask' component={() => user && user.role === 'student' ? <WrapperLayout component={StudentAskPage} role={user.role} page="ask" /> : <NotFoundPage />} />
        <PrivateRoute path='/ask/compose/:id' component={() => user && user.role === 'student' ? <WrapperLayout component={StudentComposePage} role={user.role} page="ask" /> : <NotFoundPage />} />
        <PrivateRoute path='/ask/create' component={() => user && user.role === 'student' ? <WrapperLayout component={StudentCreateAskPage} role={user.role} page="ask" /> : <NotFoundPage />} />
        <PrivateRoute path="/faq" component={() => user ? <WrapperLayout component={FAQPage} role={user.role} page="ask" /> : <NotFoundPage />} />
        <PrivateRoute path="/faq/?id=:faqId" component={() => user ? <WrapperLayout component={FAQPage} role={user.role} page="ask" /> : <NotFoundPage />} />
        {/* TEACHER */}
        <PrivateRoute exact path='/tutor' component={() => user && user.role === 'teacher' ? <WrapperLayout component={TeacherDashboardPage} role={user.role} page="tutor" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/tutor/ask' component={() => user && user.role === 'teacher' ? <WrapperLayout component={TeacherAskPage} role={user.role} page="tutor" /> : <NotFoundPage />} />
        <PrivateRoute path='/tutor/compose/:id' component={() => user && user.role === 'teacher' ? <WrapperLayout component={TeacherComposePage} role={user.role} page="tutor" /> : <NotFoundPage />} />
        <PrivateRoute path="/tutor/faq" component={() => user && user.role === 'teacher' ? <WrapperLayout component={FAQPage} role={user.role} page="ask" /> : <NotFoundPage />} />
        {/* ADMIN */}
        <PrivateRoute exact path='/admin' component={() => user && user.role === 'admin' ? <WrapperLayout component={DashboardPage} role={user.role} page="dashboard" /> : <NotFoundPage />} />
        <PrivateRoute path='/teacher' component={() => user && user.role === 'admin' ? <WrapperLayout component={TeacherPage} role={user.role} page="teacher" /> : <NotFoundPage />} />
        <PrivateRoute exact path='/course' component={() => user && user.role === 'admin' ? <WrapperLayout component={HomePage} role={user.role} page="course" /> : <NotFoundPage />} />
        <PrivateRoute path='/course/addcourse' component={() => user && user.role === 'admin' ? <WrapperLayout component={AddCoursePage} role={user.role} page="course" /> : <NotFoundPage />} />
        <PrivateRoute path='/course/addteacher' component={() => user && user.role === 'admin' ? <WrapperLayout component={AddTeacherPage} role={user.role} page="course" /> : <NotFoundPage />} />
        <PrivateRoute path="/department" component={() => user && user.role === 'admin' ? <WrapperLayout component={DepartmentPage} role={user.role} page="department" /> : <NotFoundPage />} />
        <PrivateRoute path="/report" component={() => user && user.role === 'admin' ? <WrapperLayout component={ReportPage} role={user.role} page="teacher" /> : <NotFoundPage />} />
        {/* NOT FOUND */}
        <Route path='' render={() => <NotFoundPage />} />
      </Switch>
      <GlobalStyle />
    </Layout>
  );
}
