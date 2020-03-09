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
import { Row, Layout, Col, Icon, Button, Input, Spin } from 'antd';
import { loadNote, loadFolder, createFolder, loadDeleteNote } from './actions';
import Masonry from 'masonry-layout'
const { Content, Header } = Layout;

let myTimeout = {};

/* eslint-disable react/prefer-stateless-function */
export class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      baseNotes: [],
      folderChosen: {},
      textValue: "",
      folders: [],
      windowHeight: window.innerHeight,
      namePopup: "notification",
      isShow: false,
      deleteMessage: "",
    }
  }

  componentDidMount() {
    this.props.handleLoadFolder();
    this.props.handleLoadNote();
    if (this.props.history.location.state && this.props.history.location.state.isDoneDelete) {
      this.setState({
        isShow: true,
        deleteMessage: this.props.history.location.state.isDoneDelete,
      }, () => {
        this.props.history.replace({
          pathname: '/note',
          state: {}
        })
        myTimeout = setTimeout(() => {
          this.setState({
            isShow: false
          })
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
    if (prevProps.notePage.folders !== this.props.notePage.folders) {
      this.setState({
        folders: this.props.notePage.folders,
      })
    }
    if (prevProps.notePage.message !== this.props.notePage.message) {
      this.renderPopup();
    }
    if (prevProps.notePage.notes !== this.props.notePage.notes) {
      this.setState({
        notes: this.props.notePage.notes,
      })
    }
    if (prevProps.notePage.isLoadingDelete !== this.props.notePage.isLoadingDelete && this.props.notePage.isLoadingDelete === false) {
      this.props.handleLoadNote();
      this.setState({
        isShow: true,
        deleteMessage: "Succesfully Delete",
      }, () => {
        myTimeout = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(myTimeout);
  }

  navigateDetail = (note) => {
    history.push({
      pathname: `/note/${note._id}`,
      state: {
        note: note
      }
    })
  }

  onHandleChosenFolder = (folder) => {
    const { folderChosen, baseNotes } = this.state;
    if (folder !== folderChosen) {
      var newArrNotes = baseNotes.filter(note => note.folder === folder.name)
      this.setState({
        folderChosen: folder,
        notes: newArrNotes,
      })
    } else {
      this.setState({
        folderChosen: {},
      })
    }
  }

  renderFolder = (folder, index) => {
    const { folderChosen } = this.state;
    return (
      <Button className={`${folder.folderName === folderChosen.folderName ? "folder-wrap-active" : "folder-wrap"}`} key={index} onClick={() => this.onHandleChosenFolder(folder)}>
        <div className="folder-content">
          <span className="icon-folder"></span>
          <span className="name-folder">{folder.folderName}</span>
        </div>
      </Button>
    )
  }

  onHandleSubmit = () => {
    const { textValue } = this.state;
    const body = {
      "studentID": "5e4ea4d07c213e67373d3cdb",
      "folderName": textValue,
    }
    this.props.handleCreateFolder(body);
  }

  onChangeText = (e) => {
    this.setState({
      textValue: e.target.value,
    })
  }

  renderPopup = () => {
    myTimeout = setTimeout(() => {
      this.setState({
        namePopup: "notification-show",
      }, () => {
        setTimeout(() => {
          this.setState({
            namePopup: "notification",
          });
        }, 2000)
      })
    }, 1000)
  }

  handleDeleteNote = (id) => {
    this.props.handleDeleteNote(id)
  }

  render() {
    const { notes, folders, namePopup, isShow, deleteMessage } = this.state;
    const { isLoadingFolder, message, isLoadingNote, isLoadingDelete } = this.props.notePage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#ffc143', marginRight: '10px' }} spin />;
    return (
      <Row>
        <Helmet>
          <title>NotePage</title>
          <meta name="description" content="Description of NotePage" />
        </Helmet>
        <Col span={19}>
          <Layout className="note-page">
            <Header
              style={{
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                height: '100px',
              }}
            >
              <WrappedSearchBar
                message="Please enter your note's name"
                placeholder="I want to find my notes"
                type="note"
              />
            </Header>
            <Content>
              {
                isLoadingNote ?
                  <Spin indicator={antIcon} /> :
                  <Fragment>
                    <div className="note-wrap">
                      <p className="note-type"><FormattedMessage {...messages.titlePinned} /></p>
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
                      <p className="note-type"><FormattedMessage {...messages.titleOther} /></p>
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
                  </Fragment>
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
        <Col span={5} className="note-side-wrapper">
          <Layout className="note-side">
            <Header className="filter-head">
              <FormattedMessage {...messages.filter} />
            </Header>
            <Content>
              <div className="sort">
                <p><FormattedMessage {...messages.sort} /></p>
                <Button className="btn-sort">
                  <Icon type="arrow-down" style={{ fontSize: '16px' }} />
                  <span>Time added</span>
                </Button>
              </div>
              <div className="folder">
                <p><FormattedMessage {...messages.folder} /></p>
                <Input
                  placeholder="Add new folder"
                  prefix={<Icon type="plus" style={{ color: "#ffc143" }} onClick={this.onHandleSubmit} />}
                  onChange={this.onChangeText}
                  onPressEnter={this.onHandleSubmit}
                  className="folder-add"
                />
                {
                  isLoadingFolder ?
                    <Spin indicator={antIcon} /> :
                    folders.map((folder, index) => this.renderFolder(folder, index))
                }
                {
                  message.Sucess &&
                  <div className={namePopup}>
                    <div className='noti-content-success'>
                      <span className='icon-noti accept-icon '></span>
                      <p style={{ fontSize: '12px' }}>{message.Sucess}</p>
                    </div>
                  </div>
                }
                {
                  message.Error &&
                  <div className={namePopup}>
                    <div className='noti-content-error'>
                      <span className='icon-noti deny-icon '></span>
                      <p style={{ fontSize: '12px' }}>{message.Error}</p>
                    </div>
                  </div>
                }
              </div>
            </Content>
          </Layout>
        </Col>
      </Row>
    );
  }
}

NotePage.propTypes = {
  handleLoadNote: PropTypes.func.isRequired,
  handleLoadFolder: PropTypes.func.isRequired,
  handleCreateFolder: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notePage: makeSelectNotePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadNote: () => { dispatch(loadNote()) },
    handleLoadFolder: () => { dispatch(loadFolder()) },
    handleCreateFolder: (body) => { dispatch(createFolder(body)) },
    handleDeleteNote: (id) => { dispatch(loadDeleteNote(id)) },
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
