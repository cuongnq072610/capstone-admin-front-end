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
import { Layout, Icon, Spin } from 'antd';
import WrappedSearchBar from '../../components/SearchBar';
import Note from './Note';
import { Link } from 'react-router-dom';
import Masonry from 'masonry-layout'
import './index.scss';
import { loadNotesByFolder, loadDeleteNote } from './actions';

const { Header, Content } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class NoteFolderPage extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        folder: {},
        notes: [],
        isShow: false,
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
    if (prevProps.noteFolderPage.isLoadingDelete !== this.props.noteFolderPage.isLoadingDelete && this.props.noteFolderPage.isLoadingDelete === false) {
      this.props.handleFetchNoteByCourse(folder._id);
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

  navigateDetail = (note) => {
    const { folder } = this.state;
    this.props.history.push({
      pathname: `/note/${note._id}`,
      state: {
        note: note,
        folder,
        from: `/folder/${folder.courseCode}`,
      }
    })
  }

  renderFolderNoteName = (name, code) => {
    return code + ' - ' + name;
  }

  handleDeleteNote = (id) => {
    this.props.handleDeleteNote(id)
  }

  render() {
    const { folder, notes, isShow, deleteMessage } = this.state;
    const { isLoading, isLoadingDelete } = this.props.noteFolderPage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#ffc143', marginRight: '10px' }} spin />;

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
            </div>
            <WrappedSearchBar
              message="Please enter your note's name"
              placeholder="I want to find my notes"
              type="note"
            />
          </Header>
          <Content>
            {
              isLoading ?
                <Spin indicator={antIcon} /> :
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
};

const mapStateToProps = createStructuredSelector({
  noteFolderPage: makeSelectNoteFolderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchNoteByCourse: (courseId) => { dispatch(loadNotesByFolder(courseId)) },
    handleDeleteNote: (id) => { dispatch(loadDeleteNote(id)) },
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
