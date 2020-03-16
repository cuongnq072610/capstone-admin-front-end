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
import { loadNote, loadDeleteNote } from './actions';
import Masonry from 'masonry-layout'
const { Content, Header } = Layout;

const mockDataFolder = [
  {
    id: 1,
    courseCode: 'COM101',
    courseName: 'Communication Principle',
  },
  {
    id: 2,
    courseCode: 'ASD203',
    courseName: 'Algorithms and Data Structure',
  },
  {
    id: 3,
    courseCode: 'FIN102',
    courseName: 'Finance Principles',
  },
  {
    id: 4,
    courseCode: 'DBW231',
    courseName: 'Datawarehouse',
  },
  {
    id: 5,
    courseCode: 'ECO101',
    courseName: 'E-commerce',
  },
]

const mockDataNotes = [
  {
    studentID: 1,
    courseCode: 'ABC123',
    note: '<p>Take note here</p>',
    description: 'This is new note',
    url: 'reactjs.org',
    index: 1,
    dateModified: 14 / 3 / 2020,
    isPinned: false,
  },
  {
    studentID: 1,
    courseCode: 'ABC123',
    note: '<p>Take note here</p>',
    description: 'This is new note',
    url: 'reactjs.org',
    index: 1,
    dateModified: 14 / 3 / 2020,
    isPinned: false,
  },
  {
    studentID: 1,
    courseCode: 'ABC123',
    note: '<p>Take note here</p>',
    description: 'This is new note',
    url: 'reactjs.org',
    index: 1,
    dateModified: 14 / 3 / 2020,
    isPinned: false,
  },
  {
    studentID: 1,
    courseCode: 'ABC123',
    note: '<p>Take note here</p>',
    description: 'This is new note',
    url: 'reactjs.org',
    index: 1,
    dateModified: 14 / 3 / 2020,
    isPinned: false,
  },
  {
    studentID: 1,
    courseCode: 'ABC123',
    note: '<p>Take note here</p>',
    description: 'This is new note',
    url: 'reactjs.org',
    index: 1,
    dateModified: 14 / 3 / 2020,
    isPinned: false,
  },
]

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
    }
  }

  componentDidMount() {
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
        this.timer1 = setTimeout(() => {
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
        this.timer2 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }
  }

  navigateDetail = (note) => {
    history.push({
      pathname: `/note/${note._id}`,
      state: {
        note: note
      }
    })
  }

  navigateDetailFolder = (folder) => {
    history.push({
      pathname: `/folder/${folder.courseCode}`,
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

  render() {
    const { notes, isShow, deleteMessage, isShowFolder } = this.state;
    const { isLoadingNote, isLoadingDelete } = this.props.notePage;
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
              <p className="note-page-name">Notes</p>
              <WrappedSearchBar
                message="Please enter your note's name"
                placeholder="I want to find my notes"
                type="note"
              />
            </Header>
            <Content>
              <div className='note-folder'>
                <Button className='note-folder-title' onClick={this.handleShowFolder}>
                  <p>Folders</p>{isShowFolder ? <Icon type="down" style={{color: '#111'}}/> : <Icon type="up" style={{color: '#111'}}/>}
                </Button>
                {
                  isShowFolder &&
                  <div className='grid folder-container'>
                    {
                      mockDataFolder.map((folder, index) => {
                        return (
                          <Button className='grid-item folder-note' key={index} onClick={() => this.navigateDetailFolder(folder)}>
                            <span className='folder-note-icon'></span>
                            <p className='folder-note-name'>{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
                          </Button>
                        )
                      })
                    }
                  </div>
                }
              </div>
              <div className="note-wrap">
                <p className="note-type">Recent Notes</p>
                {
                  // isLoadingNote ?
                  //   <Spin indicator={antIcon} /> :
                  <div className="grid note-container" >
                    {
                      mockDataNotes.map((note, index) => {
                        return (
                          <Note
                            key={index}
                            note={note}
                            navigateDetail={() => this.navigateDetail(note)}
                            deleteNote={this.handleDeleteNote}
                            isLoading={isLoadingDelete}
                          />
                        )
                      })
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
};

const mapStateToProps = createStructuredSelector({
  notePage: makeSelectNotePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadNote: () => { dispatch(loadNote()) },
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
