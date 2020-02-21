/**
 *
 * StudentAskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import WrappedSearchBar from '../../components/SearchBar';
import { Row, Layout, Col, Table, Icon } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentAskPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import "./ask.scss";
import columns from './tableCol';
import FilterSearch from './FilterSearch';

const { Content, Header } = Layout;

const mockData = [
    {
        teacher: "LamPD",
        mail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        date: '18:20',
    },
    {
        teacher: "MaiTT",
        mail: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        date: '14:57',
    },
    {
        teacher: "MaiVTT",
        mail: "It is a long established fact that a reader will be distracted by the readable",
        date: 'Dec 19',
    },
    {
        teacher: "PhuongLh7",
        mail: "Contrary to popular belief, Lorem Ipsum is not simply random text",
        date: 'Dec 17',
    },
    {
      teacher: "TungNN13",
      mail: "It has roots in a piece of classical Latin literature from 45 BC",
      date: 'Dec 16',
    },
    {
      teacher: "NguyetTM22",
      mail: "There are many variations of passages of Lorem Ipsum available",
      date: 'Dec 15',
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
    
    const {teachers} =this.state;
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
                                  type="ask"/>
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
                        pathname: './compose',
                        state: { teacher: record }
                      })
                    }
                  }}
                    />
                  </Row>
                  <div className="float" onClick={() => this.props.history.push("/compose")}>
                    <Icon type="plus" className="my-float" />
                  </div>
              </Content>
            </Layout>
        </Col>
        <Col span={5}>
          <FilterSearch/>
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
