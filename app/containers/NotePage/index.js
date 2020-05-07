/**
 *
 * NotePage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import "./index.scss";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNotePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Note from './Note';
import history from '../../utils/history';
import WrappedSearchBar from '../../components/SearchBar';
import { Row, Layout, Col, Icon, Button, Spin } from 'antd';
import { loadNote, loadDeleteNote, loadStudentCourses, searchNote } from './actions';
import Masonry from 'masonry-layout'
const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      baseNotes: [],
      windowHeight: window.innerHeight,
      isShow: false,
      deleteMessage: "",
      isShowFolder: true,
      folders: [],
      isSearching: false,
      searchingNotes: [],
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.handleLoadNote();
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
    if (prevProps.notePage.notes !== this.props.notePage.notes) {
      this.setState({
        notes: this.props.notePage.notes,
      })
    }
    if (prevProps.notePage.searchingNotes !== this.props.notePage.searchingNotes) {
      this.setState({
        searchingNotes: this.props.notePage.searchingNotes,
      })
    }
    if (prevProps.notePage.folders !== this.props.notePage.folders) {
      this.setState({
        folders: this.props.notePage.folders,
      })
    }
    if (prevProps.notePage.isLoadingDelete !== this.props.notePage.isLoadingDelete && this.props.notePage.isLoadingDelete === false) {
      this.props.handleLoadNote();
      // show modal success
      this.setState({
        isShow: true,
        deleteMessage: "Succesfully Delete",
      }, () => {
        this.timer2 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  }

  navigateDetail = (note) => {
    history.push({
      pathname: `/note/${note._id}`,
      state: {
        note: note,
        from: `/note`
      }
    })
  }

  navigateDetailFolder = (folder) => {
    history.push({
      pathname: `/note/folder/${folder.courseCode}`,
      state: {
        folder
      }
    })
  }

  handleDeleteNote = (id) => {
    this.props.handleDeleteNote(id)
  }

  renderFolderNoteName = (name, code) => {
    return code + ' - ' + name;
  }

  handleShowFolder = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowFolder: !prevState.isShowFolder
      }
    })
  }

  handleSyncNote = () => {
    this.props.handleLoadNote();
  }

  handleSearch = (key) => {
    this.setState({
      isSearching: true
    })
    this.props.fetchSearchNote(key);
  }

  handleClear = () => {
    this.setState({
      isSearching: false
    }, () => {
      const user = JSON.parse(localStorage.getItem("user"));
      this.props.handleLoadNote();
      this.props.handleLoadCourse(user.profile);
    })
  }

  render() {
    const { notes, isShow, deleteMessage, isShowFolder, folders, isSearching, searchingNotes } = this.state;
    const { isLoadingNote, isLoadingDelete, isLoadingCourse } = this.props.notePage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#ffc143', marginRight: '10px' }} spin />;
    return (
      <Row>
        <Helmet>
          <title>NotePage</title>
          <meta name="description" content="Description of NotePage" />
        </Helmet>
        <Col>
          <Layout className="note-page">
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
              <div className='note-page-name-wrapper'>
                <p className="note-page-name">Notes</p>
                {!isSearching && <Button className='btn-sync' onClick={this.handleSyncNote}><span className='sync-icon'></span></Button>}
              </div>
              <WrappedSearchBar
                message="Please enter your note's name"
                placeholder="I want to find my notes"
                type="note"
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
              />
            </Header>
            <Content>
              {
                isSearching ?
                  isLoadingNote ?
                    <div className='loading-field'>
                      <Spin indicator={antIcon} />
                    </div> :
                    <div className="grid note-container" >
                      {
                        searchingNotes.length > 0 ?
                          searchingNotes.map((note, index) => {
                            return (
                              <Note
                                key={index}
                                note={note}
                                navigateDetail={() => this.navigateDetail(note)}
                                deleteNote={this.handleDeleteNote}
                                isLoading={isLoadingDelete}
                              />
                            )
                          }) :
                          <span style={{ color: "#8c8a82" }}>You don't have any notes</span>
                      }
                    </div> :
                  <div>
                    <div className='note-folder'>
                      <Button className='note-folder-title' onClick={this.handleShowFolder}>
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
                                folders.map((course, index) => {
                                  return (
                                    <Button className='grid-item folder-note' key={index} onClick={() => this.navigateDetailFolder(course)}>
                                      <span className='folder-note-icon'></span>
                                      <p className='folder-note-name'>{this.renderFolderNoteName(course.courseName, course.courseCode)}</p>
                                    </Button>
                                  )
                                }) : <span style={{ color: "#8c8a82" }}>You don't have any folders</span>
                          }
                        </div>
                      }
                    </div>
                    <div className="note-wrap">
                      <p className="note-type">Recent Notes</p>
                      {
                        isLoadingNote ?
                          <div className='loading-field'>
                            <Spin indicator={antIcon} />
                          </div> :
                          <div className="grid note-container" >
                            {
                              notes.length > 0 ?
                                notes.map((note, index) => {
                                  return (
                                    <Note
                                      key={index}
                                      note={note}
                                      navigateDetail={() => this.navigateDetail(note)}
                                      deleteNote={this.handleDeleteNote}
                                      isLoading={isLoadingDelete}
                                    />
                                  )
                                }) :
                                <span style={{ color: "#8c8a82" }}>You don't have any notes</span>
                            }
                          </div>
                      }
                    </div>
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

NotePage.propTypes = {
  handleLoadNote: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleLoadCourse: PropTypes.func.isRequired,
  fetchSearchNote: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notePage: makeSelectNotePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadNote: () => { dispatch(loadNote()) },
    handleDeleteNote: (id) => { dispatch(loadDeleteNote(id)) },
    handleLoadCourse: (id) => { dispatch(loadStudentCourses(id)) },
    fetchSearchNote: (key) => { dispatch(searchNote(key)) },
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
