/**
 *
 * NoteFolderPage
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
import makeSelectNoteFolderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Layout, Icon, Spin, Button, Popover } from 'antd';
import WrappedSearchBar from '../../components/SearchBar';
import Note from './Note';
import { Link } from 'react-router-dom';
import Masonry from 'masonry-layout'
import './index.scss';
import { loadNotesByFolder, loadDeleteNote, searchNote, loadDeleteNoteByFolderId, loadDeleteFolder } from './actions';

const { Header, Content, Footer } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class NoteFolderPage extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        folder: {},
        notes: [],
        isShow: false,
        isSearching: false,
        searchNotes: [],
        clicked: false,
      }
  }
  componentDidMount() {
    const { folder } = this.props.history.location.state;
    this.setState({
      folder,
    })
    this.props.handleFetchNoteByCourse(folder._id);
    const message = localStorage.getItem("message");
    //show delete navigate from detail page
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
    const { folder } = this.state;
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
    if (prevProps.noteFolderPage.notes !== this.props.noteFolderPage.notes) {
      this.setState({
        notes: this.props.noteFolderPage.notes,
      })
    }
    if (prevProps.noteFolderPage.searchNotes !== this.props.noteFolderPage.searchNotes) {
      this.setState({
        searchNotes: this.props.noteFolderPage.searchNotes,
      })
    }
    // delete note success
    if (prevProps.noteFolderPage.isLoadingDelete !== this.props.noteFolderPage.isLoadingDelete && this.props.noteFolderPage.isLoadingDelete === false) {
      this.props.handleFetchNoteByCourse(folder._id);
      // show modal success
      this.setState({
        isShow: true,
        deleteMessage: this.props.noteFolderPage.message,
        clicked: false,
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }
    // delete folder success
    if (prevProps.noteFolderPage.isLoadingDeleteFolder !== this.props.noteFolderPage.isLoadingDeleteFolder && this.props.noteFolderPage.isLoadingDeleteFolder === false) {
      localStorage.setItem("message", this.props.noteFolderPage.message)
      this.props.history.push({
        pathname: '/note',
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  navigateDetail = (note) => {
    const { folder } = this.state;
    this.props.history.push({
      pathname: `/note/${note._id}`,
      state: {
        note: note,
        folder,
        from: `/note/folder/${folder.courseCode}`,
      }
    })
  }

  renderFolderNoteName = (name, code) => {
    if (code === "other" || code === "Other") {
      return name
    } else {
      return code + ' - ' + name;
    }
  }

  handleDeleteNote = (id) => {
    this.props.handleDeleteNote(id)
  }

  handleSearch = (key) => {
    const { folder } = this.state;
    this.setState({
      isSearching: true,
    })
    this.props.fetchSearchNote(key, folder._id);
  }

  handleClear = () => {
    const { folder } = this.state;
    this.setState({
      isSearching: false,
    })
    this.props.handleFetchNoteByCourse(folder._id);
  }

  handleSyncNote = () => {
    const { folder } = this.state;
    this.props.handleFetchNoteByCourse(folder._id);
  }

  handleClickChangePopover = visible => {
    this.setState({
      clicked: visible,
    });
  };

  hide = () => {
    this.setState({
      clicked: false,
    });
  };

  handleDeleteFolder = () => {
    const { folder } = this.state;
    this.props.handleDeleteFolder(folder._id);
  }

  render() {
    const { folder, notes, isShow, deleteMessage, isSearching, searchNotes, clicked } = this.state;
    const { isLoading, isLoadingDelete, isLoadingDeleteFolder } = this.props.noteFolderPage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#ffc143', marginRight: '10px' }} spin />;

    const contentPopover = (
      <Layout id='delete-modal'>
        <Content className='delete-modal-content'>
          {
            folder.isStudying &&
            <div>
              {
                notes.length > 0 ?
                  <p className="content-main">Because you are studying this course so you can only delete notes in this folder</p>
                  :
                  <p className="content-main">You don't have any notes</p>
              }
            </div>
          }
        </Content>
        <Footer className='delete-modal-footer'>
          <Button onClick={this.hide} className='modal-cancel-btn'>Cancel</Button>
          <Button
            onClick={this.handleDeleteFolder}
            className='modal-delete-btn'
            type='danger'
            disabled={folder.isStudying ? notes.length > 0 ? false : true : false}
          >
            {isLoadingDeleteFolder ?
              <Spin indicator={antIcon} /> :
              <span>Delete</span>
            }
          </Button>
        </Footer>
      </Layout>
    );

    return (
      <div>
        <Helmet>
          <title>NoteFolderPage</title>
          <meta name="description" content="Description of NoteFolderPage" />
        </Helmet>
        <Layout className="note-folder">
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
            <div className="note-page-header">
              <Link to="/note">
                <Icon type="arrow-left" style={{ fontSize: '20px', color: '#ffc143', marginBottom: '25px' }} />
              </Link>
              <p className="note-page-name">{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
              <Button className='btn-sync' onClick={this.handleSyncNote}><span className='sync-icon'></span></Button>
            </div>
            <div className='note-header-side'>
              <WrappedSearchBar
                message="Please enter your note's name"
                placeholder="I want to find my notes"
                type="note"
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
              />
              <Popover
                content={contentPopover}
                placement="bottomRight"
                trigger="click"
                visible={clicked}
                onVisibleChange={this.handleClickChangePopover}
                title="Do you want to delete this folder?"
                id="delete-popover"
              >
                <Button type='danger' className='btn-delete-folder'><span className="folder-delete-icon"></span></Button>
              </Popover>
            </div>
          </Header>
          <Content>
            {
              isSearching ?
                isLoading ?
                  <div className='loading-field'>
                    <Spin indicator={antIcon} />
                  </div> :
                  searchNotes.length > 0 ?
                    notes.map((note, index) => {
                      return <Note
                        key={index}
                        note={note}
                        navigateDetail={() => this.navigateDetail(note)}
                        deleteNote={this.handleDeleteNote}
                        isLoading={isLoadingDelete}
                      />
                    })
                    : <span style={{ color: "#8c8a82" }}>You don't have any notes</span>
                :
                isLoading ?
                  <div className='loading-field'>
                    <Spin indicator={antIcon} />
                  </div> :
                  notes.length > 0 ?
                    <Fragment>
                      <div className="note-wrap">
                        <p className="note-type">Pinned</p>
                        <div className="grid note-container" >
                          {
                            notes.map((note, index) => {
                              if (note.isPinned) {
                                return (
                                  <Note
                                    key={index}
                                    note={note}
                                    navigateDetail={() => this.navigateDetail(note)}
                                    deleteNote={this.handleDeleteNote}
                                    isLoading={isLoadingDelete}
                                  />
                                )
                              }
                            })
                          }
                        </div>
                      </div>
                      <div className="note-wrap">
                        <p className="note-type">Other</p>
                        <div className="grid note-container" >
                          {
                            notes.map((note, index) => {
                              if (!note.isPinned) {
                                return (
                                  <Note
                                    key={index}
                                    note={note}
                                    navigateDetail={() => this.navigateDetail(note)}
                                    deleteNote={this.handleDeleteNote}
                                    isLoading={isLoadingDelete}
                                  />
                                )
                              }
                            })
                          }
                        </div>
                      </div>
                    </Fragment> : <span style={{ color: "#8c8a82" }}>You don't have any notes</span>
            }
            <div className={isShow ? 'notification-show' : 'notification'}>
              <div className='noti-content-success'>
                <span className='icon-noti accept-icon '></span>
                <p style={{ fontSize: '14px' }}>{deleteMessage}</p>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

NoteFolderPage.propTypes = {
  handleFetchNoteByCourse: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  fetchSearchNote: PropTypes.func.isRequired,
  handleDeleteFolder: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  noteFolderPage: makeSelectNoteFolderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchNoteByCourse: (courseId) => { dispatch(loadNotesByFolder(courseId)) },
    handleDeleteNote: (id) => { dispatch(loadDeleteNote(id)) },
    fetchSearchNote: (key, id) => { dispatch(searchNote(key, id)) },
    handleDeleteFolder: (id) => { dispatch(loadDeleteFolder(id)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'noteFolderPage', reducer });
const withSaga = injectSaga({ key: 'noteFolderPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NoteFolderPage);
