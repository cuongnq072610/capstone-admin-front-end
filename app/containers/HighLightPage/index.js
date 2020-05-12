/**
 *
 * HighLightPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHighLightPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WrappedSearchBar from '../../components/SearchBar';
import HighLightElement from './HighlightElement';
import { Row, Layout, Col, Icon, Button, Spin } from 'antd';
import "./index.scss";
import Masonry from 'masonry-layout'
import { loadHighlight, loadStudentCourses, loadDeleteHighlight, searchHighlight } from './actions';
const { Header, Content } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class HighLightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlights: [],
      baseHighlight: [],
      folderChosen: {},
      textValue: "",
      folders: [],
      windowHeight: window.innerHeight,
      isShowFolder: true,
      folders: [],
      isSearching: false,
      searchHighlight: [],
    }
  }

  componentDidMount() {
    this.props.handleFetchHighlights();
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.handleLoadCourse(user.profile);

    const message = localStorage.getItem("message");
    //show delete navigate from detail page and folder page
    if (message) {
      // show modal success
      this.setState({
        isShow: true,
        deleteMessage: message,
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false,
          }, () => localStorage.removeItem("message"))
        }, 3000)
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  componentDidUpdate(prevProps) {
    var elem = document.querySelector('.grid');
    var msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item',
      columnWidth: 10,
      gutter: 10,
      horizontalOrder: true
    });
    if (prevProps.highLightPage.highlights !== this.props.highLightPage.highlights) {
      this.setState({
        highlights: this.props.highLightPage.highlights,
      });
    }
    if (prevProps.highLightPage.searchHighlight !== this.props.highLightPage.searchHighlight) {
      this.setState({
        searchHighlight: this.props.highLightPage.searchHighlight,
      });
    }
    if (prevProps.highLightPage.folders !== this.props.highLightPage.folders) {
      this.setState({
        folders: this.props.highLightPage.folders,
      })
    }
    if (prevProps.highLightPage.isLoadingDelete !== this.props.highLightPage.isLoadingDelete
      && this.props.highLightPage.isLoadingDelete === false
    ) {
      this.props.handleFetchHighlights();
      // show modal success check
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

  renderFolder = (folder, index) => {
    const { folderChosen } = this.state;
    return (
      <Button className={`${folder.name === folderChosen.name ? "folder-wrap-active" : "folder-wrap"}`} key={index} onClick={() => this.onHandleChosenFolder(folder)}>
        <div className="folder-content">
          <span className="icon-folder"></span>
          <span className="name-folder">{folder.name}</span>
        </div>
      </Button>
    )
  }

  handleShowFolder = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowFolder: !prevState.isShowFolder
      }
    })
  }

  renderFolderNoteName = (name, code) => {
    if (code === "other" || code === "Other") {
      return name;
    } else {
      return code + ' - ' + name;
    }
  }

  navigateDetailFolder = (folder) => {
    this.props.history.push({
      pathname: `/highlight/${folder.courseCode}`,
      state: {
        folder
      }
    })
  }

  handleSearch = (key) => {
    this.setState(prevState => {
      return {
        ...prevState,
        isSearching: true
      }
    })
    this.props.fetchSearchHighlight(key);
  }

  handleClear = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isSearching: false
      }
    }, () => {
      this.props.handleFetchHighlights();
      const user = JSON.parse(localStorage.getItem("user"));
      this.props.handleLoadCourse(user.profile);
    })
  }

  handleDeleteHighlight = (id) => {
    this.props.handleDeleteHighlight(id);
  }

  handleSyncHighlight = () => {
    this.props.handleFetchHighlights();
  }

  handleGoToCourse = (url) => {
    window.open(url, '_blank')
  }

  render() {
    const { highlights, folders, isShowFolder, isShow, deleteMessage, isSearching, searchHighlight } = this.state;
    const { isLoading, isLoadingCourse, isLoadingDelete } = this.props.highLightPage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#40a887', marginRight: '10px' }} spin />;
    return (
      <Row>
        <Helmet>
          <title>Highlight Page</title>
          <meta name="description" content="Description of Highlight Page" />
        </Helmet>
        <Col>
          <Layout className="highlight-page">
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
              <div className='highlight-page-name-wrapper'>
                <p className="highlight-page-name">HighLights</p>
                {!isSearching && <Button className='btn-sync' onClick={this.handleSyncHighlight}><span className='sync-icon'></span></Button>}
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
                isSearching ?
                  isLoading ?
                    <div className='loading-field'>
                      <Spin indicator={antIcon} />
                    </div> :
                    <div className="highLights grid" >
                      {
                        searchHighlight.length > 0 ?
                          searchHighlight.map(highlight => {
                            return <HighLightElement
                              key={highlight.id}
                              highlight={highlight}
                              deleteHighlight={this.handleDeleteHighlight}
                              isLoading={isLoadingDelete}
                              onGoTo={this.handleGoToCourse}
                            />
                          }) : <span style={{ color: "#8c8a82" }}>You don't have any highlights</span>
                      }
                    </div> :
                  <div>
                    <div className='highlight-folder'>
                      <Button className='highlight-folder-title' onClick={this.handleShowFolder}>
                        <p>Folders</p>{isShowFolder ? <Icon type="down" style={{ color: '#111' }} /> : <Icon type="up" style={{ color: '#111' }} />}
                      </Button>
                      {
                        isShowFolder &&
                        <div className='grid folder-container'>
                          {
                            isLoadingCourse ?
                              <div className='loading-field'>
                                <Spin indicator={antIcon} />
                              </div> :
                              folders.length > 0 ?
                                folders.map((folder, index) => {
                                  return (
                                    <Button className='grid-item folder-highlight' key={index} onClick={() => this.navigateDetailFolder(folder)}>
                                      <span className='folder-highlight-icon'></span>
                                      <p className='folder-highlight-name'>{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
                                    </Button>
                                  )
                                }) : <span style={{ color: "#8c8a82" }}>You don't have any folders</span>
                          }
                        </div>
                      }
                    </div>
                    <p className="highlight-type">Recent Highlights</p>
                    {
                      isLoading ?
                        <div className='loading-field'>
                          <Spin indicator={antIcon} />
                        </div> :
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
                  </div>
              }
            </Content>
          </Layout>
        </Col>
      </Row>
    );
  }
}

HighLightPage.propTypes = {
  handleFetchHighlights: PropTypes.func.isRequired,
  handleLoadCourse: PropTypes.func.isRequired,
  handleDeleteHighlight: PropTypes.func.isRequired,
  fetchSearchHighlight: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  highLightPage: makeSelectHighLightPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchHighlights: () => { dispatch(loadHighlight()) },
    handleLoadCourse: (id) => { dispatch(loadStudentCourses(id)) },
    handleDeleteHighlight: (id) => { dispatch(loadDeleteHighlight(id)) },
    fetchSearchHighlight: (key) => { dispatch(searchHighlight(key)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'highLightPage', reducer });
const withSaga = injectSaga({ key: 'highLightPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HighLightPage);
