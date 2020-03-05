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

const mockData = [
  {
    id: 1,
    teacher: "LamPD",
    mail: "lampd@fe.edu.vn",
    question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    date: '18:20',
    isReaded: true,
  },
  {
    id: 2,
    teacher: "MaiTT",
    mail: "maitt@fe.edu.vn",
    question: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    date: '14:57',
    isReaded: false,
  },
  {
    id: 3,
    teacher: "MaiVTT",
    mail: "maivtt@fe.edu.vn",
    question: "It is a long established fact that a reader will be distracted by the readable",
    date: 'Dec 19',
    isReaded: true,
  },
  {
    id: 4,
    teacher: "PhuongLh7",
    mail: "phuonglh17@fe.edu.vn",
    question: "Contrary to popular, belief, Lorem Ipsum is not simply random text",
    date: 'Dec 17',
    isReaded: false,
  },
  {
    id: 5,
    teacher: "TungNN13",
    mail: "tungnn13@fe.edu.vn",
    question: "It has roots in a piece of classical Latin literature from 45 BC",
    date: 'Dec 16',
    isReaded: true,
  },
  {
    id: 6,
    teacher: "NguyetTM22",
    mail: "nguyettm22@fe.edu.vn",
    question: "There are many variations of passages of Lorem Ipsum available",
    date: 'Dec 15',
    isReaded: true,
  },
]
/* eslint-disable react/prefer-stateless-function */
export class StudentAskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
    }
  }

  componentDidMount() {
    const formatTeachers = mockData.map((teacher, index) => {
      return {
        ...teacher,
        key: `${index}`
      }
    })
    this.setState({
      teachers: formatTeachers,
    })
  }

  render() {
    const { teachers } = this.state;
    console.log(this.props.history)
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
                    columns={columns}
                    dataSource={teachers}
                    className="ask-table"
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: e => this.props.history.push({
                          pathname: `/ask/compose/${record.id}`,
                          state: { teacher: record }
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
