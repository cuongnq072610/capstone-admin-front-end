/**
 *
 * StudentAskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import WrappedSearchBar from '../../components/SearchBar';
import { Row, Layout, Col, Table, Icon } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentAskPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import "./ask.scss";
import columns from './tableCol';
import FilterSearch from './FilterSearch';

const { Content, Header } = Layout;

const mockDataForAsks = [
  {
      "comments": [{
        "_id": "5e61ca10a3e5d42d44d2544e",
        "userID": "5e4ea4d07c213e67373d3cdb",
        "ask": "5e61c4422ea9722f785cab17",
        "message": "Thanks Evan for A2A.",
        "dateCreated": "06/03/2020",
        "__v": 0
      },
      {
        "_id": "5e61ca5ea3e5d42d44d2544f",
        "userID": "5e4eab447c213e67373d414a",
        "ask": "5e61c4422ea9722f785cab17",
        "message": "Usually over-relaxation pushes one to inactivity that is manifestation of sinking deeper and deeper in a comfort zone.",
        "dateCreated": "06/03/2020",
        "__v": 0
      }],
      "_id": "5e61c3417c213e3443e8dd81",
      "scannedContent": "Plus, Apple decided that this black bar had to be always shown to the user",
      "askContent": "How would Steve Jobs react if he saw the iPhone X?",
      "student": {
          "_id": "5e4ea4d07c213e67373d3cdb",
          "name": "Minh",
          "email": "first@fpt.edu.vn",
          "studentCode": "SE12345"
      },
      "teacher": {
          "rating": {
              "star_1": 2,
              "star_2": 3,
              "star_3": 4,
              "star_4": 5,
              "star_5": 6
          },
          "courses": [],
          "_id": "5e4eab447c213e67373d414a",
          "name": "LamPT",
          "email": "first@fpt.edu.vn",
          "isActive": false
      },
      "courseURL": "abc.xyz",
      "dateModified": "06/03/2020",
      "dateCreated": "05/03/2020"
  },
  {
      "comments": [{
        "_id": "5e61ca10a3e5d42d44d2544e",
        "userID": "5e4ea4d07c213e67373d3cdb",
        "ask": "5e61c4422ea9722f785cab17",
        "message": "Thanks Evan for A2A.",
        "dateCreated": "06/03/2020",
        "__v": 0
      },
      {
        "_id": "5e61ca5ea3e5d42d44d2544f",
        "userID": "5e4eab447c213e67373d414a",
        "ask": "5e61c4422ea9722f785cab17",
        "message": "Usually over-relaxation pushes one to inactivity that is manifestation of sinking deeper and deeper in a comfort zone.",
        "dateCreated": "06/03/2020",
        "__v": 0
      }],
      "_id": "5e61c4422ea9722f785cab17",
      "scannedContent": "This is very simple and logical. When your iPhone is locked, and you’re getting an incoming call, you will have the ‘answer’ slider.",
      "askContent": "Why is it that some incoming calls on my iPhone have a decline button, but some do not?",
      "student": {
          "_id": "5e4ea4d07c213e67373d3cdb",
          "studentName": "Minh",
          "email": "first@fpt.edu.vn",
          "studentCode": "SE12345"
      },
      "teacher": {
          "rating": {
              "star_1": 2,
              "star_2": 3,
              "star_3": 4,
              "star_4": 5,
              "star_5": 6
          },
          "courses": [],
          "_id": "5e4eab447c213e67373d414a",
          "teacherName": "MaiTT",
          "email": "first@fpt.edu.vn",
          "isActive": false
      },
      "courseURL": "1",
      "dateModified": "06/03/2020",
      "dateCreated": "05/03/2020",
      "__v": 0
  }
]

/* eslint-disable react/prefer-stateless-function */
export class StudentAskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [],
    }
  }

  componentDidMount() {
    this.setState({
      asks: mockDataForAsks
    })
  }

  render() {
    const { asks } = this.state;
    return (
      <div>
        <Helmet>
          <title>StudentAskPage</title>
          <meta name="description" content="Description of StudentAskPage" />
        </Helmet>
        <Row>
          <Col span={19}>
            <Layout className="ask-page">
              <Header className="ask-page-header">
                <WrappedSearchBar className="ask-page-search"
                  message="Please enter your course name"
                  placeholder="I want to find my course"
                  type="ask" />
              </Header>
              <Content className="ask-page-content">
                <Row>
                  <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={asks}
                    className="ask-table"
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: e => this.props.history.push({
                          pathname: `/ask/compose/${record._id}`,
                          state: { ask: record }
                        })
                      }
                    }}
                  />
                </Row>
                <div className="float" onClick={() => this.props.history.push("/ask/create")}>
                  <Icon type="plus" className="my-float" />
                </div>
              </Content>
            </Layout>
          </Col>
          <Col span={5}>
            <FilterSearch />
          </Col>
        </Row>
      </div>
    );
  }
}

StudentAskPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentAskPage: makeSelectStudentAskPage(),
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

const withReducer = injectReducer({ key: 'studentAskPage', reducer });
const withSaga = injectSaga({ key: 'studentAskPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentAskPage);
