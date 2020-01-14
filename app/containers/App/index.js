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
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SideMenu from 'components/Menu';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Layout>
      <Helmet
        titleTemplate="%s - Smart Course Management Admin"
        defaultTitle="Smart Course Management Admin"
      >
        <meta name="description" content="Smart Course Management Admin" />
      </Helmet>
      <SideMenu />
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/addcourse" component={AddCoursePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Layout>
      <GlobalStyle />
    </Layout>
  );
}
