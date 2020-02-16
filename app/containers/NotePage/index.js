/**
 *
 * NotePage
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
import makeSelectNotePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Note from './Note';
import history from '../../utils/history';
import WrappedSearchBar from '../../components/SearchBar';
import { Row, Layout } from 'antd';
const { Content, Header } = Layout;

const mockData = [
  {
    id: 1,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    id: 2,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
]
/* eslint-disable react/prefer-stateless-function */
export class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: []
    }
  }

  navigateDetail = (id) => {
    history.push({
      pathname: '/teacher',
    })
  }

  render() {
    return (
      <Row>
        <Helmet>
          <title>NotePage</title>
          <meta name="description" content="Description of NotePage" />
        </Helmet>
        <Layout>
          <Header
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              height: '100px',
            }}
          >
            <WrappedSearchBar
              message="Please enter your note's name"
              placeholder="I want to find my notes"
              type="note"
            />
          </Header>
          <Content>
            {
              mockData.map((note, index) => {
                return (
                  <Note key={index} note={note} navigateDetail={() => this.navigateDetail(note.id)} />
                )
              })
            }
          </Content>
        </Layout>
      </Row>
    );
  }
}

NotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notePage: makeSelectNotePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'notePage', reducer });
const withSaga = injectSaga({ key: 'notePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotePage);
