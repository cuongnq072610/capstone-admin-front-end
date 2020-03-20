/**
 *
 * HighLightPage
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
import makeSelectHighLightPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WrappedSearchBar from '../../components/SearchBar';
import HighLightElement from './HighlightElement';
import { Row, Layout, Col, Icon, Button, Input, Spin } from 'antd';
import "./index.scss";
import Masonry from 'masonry-layout'
import { loadHighlight, loadStudentCourses, loadDeleteHighlight } from './actions';
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
      courses: [],
    }
  }

  componentDidMount() {
    this.props.handleFetchHighlights();
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.handleLoadCourse(user.profile);
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
    if (prevProps.highLightPage.courses !== this.props.highLightPage.courses) {
      this.setState({
        courses: this.props.highLightPage.courses,
      })
    }
    if (prevProps.highLightPage.isLoadingDelete !== this.props.highLightPage.isLoadingDelete
      && this.props.highLightPage.isLoadingDelete === false
    ) {
      this.props.handleFetchHighlights();
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
    return code + ' - ' + name;
  }

  navigateDetailFolder = (folder) => {
    this.props.history.push({
      pathname: `/highlight/${folder.courseCode}`,
      state: {
        folder
      }
    })
  }


  handleDeleteHighlight = (id) => {
    this.props.handleDeleteHighlight(id);
  }

  render() {
    const { highlights, courses, isShowFolder, isShow, deleteMessage } = this.state;
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
              <p className="highlight-page-name">HighLights</p>
              <WrappedSearchBar
                message="Please enter your note's name"
                placeholder="I want to find my highlights"
                type="highlight"
              />
            </Header>
            <Content>
              <div className='highlight-folder'>
                <Button className='highlight-folder-title' onClick={this.handleShowFolder}>
                  <p>Folders</p>{isShowFolder ? <Icon type="down" style={{ color: '#111' }} /> : <Icon type="up" style={{ color: '#111' }} />}
                </Button>
                {
                  isShowFolder &&
                  <div className='grid folder-container'>
                    {
                      isLoadingCourse ?
                        <Spin indicator={antIcon} /> :
                        courses.length > 0 ?
                          courses.map((folder, index) => {
                            return (
                              <Button className='grid-item folder-highlight' key={index} onClick={() => this.navigateDetailFolder(folder)}>
                                <span className='folder-highlight-icon'></span>
                                <p className='folder-highlight-name'>{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
                              </Button>
                            )
                          }) : <span style={{ color: "#8c8a82" }}>You don't join any courses</span>
                    }
                  </div>
                }
              </div>
              <p className="highlight-type">Recent Highlights</p>
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
};

const mapStateToProps = createStructuredSelector({
  highLightPage: makeSelectHighLightPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchHighlights: () => { dispatch(loadHighlight()) },
    handleLoadCourse: (id) => { dispatch(loadStudentCourses(id)) },
    handleDeleteHighlight: (id) => { dispatch(loadDeleteHighlight(id)) },
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
