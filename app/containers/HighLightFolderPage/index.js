/**
 *
 * HighLightFolderPage
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
import makeSelectHighLightFolderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Layout, Col, Row, Icon, Button, Spin } from 'antd';
import Masonry from 'masonry-layout'
import WrappedSearchBar from '../../components/SearchBar';
import HighLightElement from './HighlightElement';
import './index.scss';
import { Link } from 'react-router-dom';
import { loadHighlightByFolder, loadDeleteHighlight, loadFilterHighlight, searchHighlight } from './actions';
const { Header, Content } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class HighLightFolderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {},
      windowHeight: window.innerHeight,
      highlights: [],
      isShow: false,
    }
  }

  componentDidMount() {
    const { folder } = this.props.history.location.state;
    console.log(folder)
    this.setState({
      folder,
    })
    this.props.handleFetchHighlightByCourse(folder._id);
  }

  componentDidUpdate(prevProps) {
    var elems = document.querySelectorAll('.grid');
    var msnryInstance = [];
    elems.forEach((elem, index) => {
      msnryInstance.push(
        new Masonry(elem, {
          // options
          itemSelector: '.grid-item',
          columnWidth: 98,
          gutter: 10,
          horizontalOrder: true
        })
      )
    })
    if (prevProps.highLightFolderPage.highlights !== this.props.highLightFolderPage.highlights) {
      this.setState({
        highlights: this.props.highLightFolderPage.highlights,
      })
    }
    if (prevProps.highLightFolderPage.isLoadingDelete !== this.props.highLightFolderPage.isLoadingDelete
      && this.props.highLightFolderPage.isLoadingDelete === false
    ) {
      const { folder } = this.state;
      this.props.handleFetchHighlightByCourse(folder._id);
      // show modal success
      this.setState({
        isShow: true,
        deleteMessage: "Succesfully Delete",
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  renderFolderNoteName = (name, code) => {
    return code + ' - ' + name;
  }

  handleDeleteHighlight = (id) => {
    this.props.handleDeleteHighlight(id);
  }

  handleFilterHighlight = (color) => {
    const { folder } = this.state;
    this.props.handleFetchHighlightByColor(color, folder._id);
  }

  handleSearch = (key) => {
    this.props.fetchSearchHighlight(key);
  }

  handleClear = () => {
    const { folder } = this.state;
    this.props.handleFetchHighlightByCourse(folder._id);
  }

  render() {
    const { folder, windowHeight, highlights, isShow, deleteMessage } = this.state;
    const { isLoading, isLoadingDelete } = this.props.highLightFolderPage;
    const buttonSort = [
      {
        id: 'greenSortButton',
        color: 'green'
      },
      {
        id: 'redSortButton',
        color: 'red'
      },
      {
        id: 'blueSortButton',
        color: 'blue'
      },
      {
        id: 'yellowSortButton',
        color: 'yellow'
      },
      {
        id: 'orangeSortButton',
        color: 'orange'
      }
    ];
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#40a887', marginRight: '10px' }} spin />;

    return (
      <div className='highlight-folder-page'>
        <Helmet>
          <title>HighLightFolderPage</title>
          <meta
            name="description"
            content="Description of HighLightFolderPage"
          />
        </Helmet>
        <Col span={19}>
          <Header
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: "space-between",
              alignItems: "center",
              height: '100px',
              paddingLeft: '0px',
            }}
          >
            <div className="highlight-folder-page-header">
              <Link to="/highlight">
                <Icon type="arrow-left" style={{ fontSize: '20px', color: '#53DBB1', marginBottom: '25px', marginRight: '10px' }} />
              </Link>
              <p className="highlight-page-name">{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
            </div>
            <WrappedSearchBar
              message="Please enter your note's name"
              placeholder="I want to find my highlights"
              type="highlight"
              handleSearch={this.handleSearch}
              handleClear={this.handleClear}
            />
          </Header>
          <Content>
            {
              isLoading ?
                <Spin indicator={antIcon} /> :
                <div className="highLights grid" >
                  {
                    highlights.length > 0 ?
                      highlights.map(highlight => {
                        return <HighLightElement
                          key={highlight.id}
                          highlight={highlight}
                          deleteHighlight={this.handleDeleteHighlight}
                          isLoading={isLoadingDelete}
                        />
                      }) : <span style={{ color: "#8c8a82" }}>You don't have any highlights</span>
                  }
                </div>
            }
            <div className={isShow ? 'notification-show' : 'notification'}>
              <div className='noti-content-success'>
                <span className='icon-noti accept-icon '></span>
                <p style={{ fontSize: '14px' }}>{deleteMessage}</p>
              </div>
            </div>
          </Content>
        </Col>
        <Col span={5} className="highlight-side-wrapper" style={{ 'height': windowHeight - 10 }}>
          <Layout className="highlight-side">
            <Header className="filter-head">
              Filter
            </Header>
            <Content>
              <div className="sort">
                <p>SORT BY</p>
                <div className="sortByColor">
                  {
                    buttonSort.map((item, index) => {
                      return <Button key={index} id={item.id} className={'sortButton background-' + item.color} shape="circle" onClick={() => this.handleFilterHighlight(item.color)} />
                    })
                  }
                </div>
                <Button className='btn-clear-filter' onClick={this.handleClear}>Clear</Button>
              </div>
            </Content>
          </Layout>
        </Col>
      </div>
    );
  }
}

HighLightFolderPage.propTypes = {
  handleFetchHighlightByCourse: PropTypes.func.isRequired,
  handleDeleteHighlight: PropTypes.func.isRequired,
  handleFetchHighlightByColor: PropTypes.func.isRequired,
  fetchSearchHighlight: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  highLightFolderPage: makeSelectHighLightFolderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchHighlightByCourse: (courseId) => { dispatch(loadHighlightByFolder(courseId)) },
    handleDeleteHighlight: (id) => { dispatch(loadDeleteHighlight(id)) },
    handleFetchHighlightByColor: (color, courseId) => { dispatch(loadFilterHighlight(color, courseId)) },
    fetchSearchHighlight: (key) => { dispatch(searchHighlight(key)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'highLightFolderPage', reducer });
const withSaga = injectSaga({ key: 'highLightFolderPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HighLightFolderPage);
