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
import { loadAsk, searchAsk } from './actions';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class StudentAskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [],
    }
  }

  componentDidMount() {
    this.props.handleFetchAsks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.studentAskPage.asks !== this.props.studentAskPage.asks) {
      this.setState({
        asks: this.props.studentAskPage.asks
      })
    }
  }

  handleSearch = (key) => {
    this.props.handleSearchAsks(key);
  }

  handleClear = () => {
    this.props.handleFetchAsks();
  }

  render() {
    const { asks } = this.state;
    const { isLoading } = this.props.studentAskPage;
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
                <div className='ask-page-name-wrapper'>
                  <p className="ask-page-name">Asks</p>
                </div>
                <WrappedSearchBar className="ask-page-search"
                  message="Please enter your course name"
                  placeholder="I want to find my course"
                  type="ask"
                  handleSearch={this.handleSearch}
                  handleClear={this.handleClear}
                />
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
                        })
                      }
                    }}
                    loading={isLoading}
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
  handleFetchAsks: PropTypes.func.isRequired,
  handleSearchAsks: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentAskPage: makeSelectStudentAskPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchAsks: () => { dispatch(loadAsk()) },
    handleSearchAsks: (key) => { dispatch(searchAsk(key)) },
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
