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
import Filter from '../../components/Filter';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class StudentAskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asks: [],
      baseAsks: [],
    }
  }

  componentDidMount() {
    this.props.handleFetchAsks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.studentAskPage.asks !== this.props.studentAskPage.asks) {
      this.setState({
        asks: this.props.studentAskPage.asks,
        baseAsks: this.props.studentAskPage.asks,
      })
    }
  }

  handleSearch = (key) => {
    this.props.handleSearchAsks(key);
  }

  handleClear = () => {
    this.props.handleFetchAsks();
  }

  onFilterByStatus = (status) => {
    const { baseAsks } = this.state;
    let filterAsks = [];
    switch (status) {
      case "opened":
        filterAsks = baseAsks.filter(ask => ask.isClosed === false);
        this.setState({
          asks: filterAsks,
        })
        break;
      case "closed":
        filterAsks = baseAsks.filter(ask => ask.isClosed === true);
        this.setState({
          asks: filterAsks,
        })
        break;
      case "seen":
        filterAsks = baseAsks.filter(ask => ask.status === 'seen');
        this.setState({
          asks: filterAsks,
        })
        break;
      case "unseen":
        filterAsks = baseAsks.filter(ask => (ask.status === 'new' || ask.status === 'replied'));
        this.setState({
          asks: filterAsks,
        })
        break;
      default:
        break;
    }
  }

  onResetFilter = () => {
    this.setState({
      asks: this.state.baseAsks,
    })
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
          <Layout className="ask-page">
            <Header className="ask-page-header">
              <div className='ask-page-name-wrapper'>
                <p className="ask-page-name">Asks</p>
              </div>
              <div className='ask-page-header-side'>
                <WrappedSearchBar className="ask-page-search"
                  message="Please enter your question key"
                  placeholder="I want to find my question"
                  type="ask"
                  handleSearch={this.handleSearch}
                  handleClear={this.handleClear}
                />
                <Filter
                  type="ask"
                  onReset={this.onResetFilter}
                  onFilter={this.onFilterByStatus}
                />
              </div>
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
