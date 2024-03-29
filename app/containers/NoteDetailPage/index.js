/**
 *
 * NoteDetailPage
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
import makeSelectNoteDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Row, Col, Button, Icon, Input, Layout, Spin } from 'antd';
import "./index.scss";
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import { loadNoteDetail, loadSaveNote, loadDeleteNote } from './actions';
const { Header, Content, Footer } = Layout;
Quill.register('modules/imageDrop', ImageDrop);


/* eslint-disable react/prefer-stateless-function */
export class NoteDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      editorHtml: '',
      isPinned: false,
      description: "",
      isShow: false,
    }
  }

  componentDidMount() {
    const id = this.props.match.params.noteId;
    this.props.handleFetchNoteDetail(id);
  }

  componentDidUpdate(prevProps) {
    const setBrTagNote = (str) => {
      let strTitle = str.replace(/(?:\r\n|\r|\n)/g, "<br>");
      return strTitle;
    }
    if (prevProps.noteDetailPage.note !== this.props.noteDetailPage.note) {
      const { note, isLoading, isLoadingUpdate } = this.props.noteDetailPage
      if (!isLoading && !isLoadingUpdate) {
        this.setState({
          note,
          isPinned: note.isPinned,
          editorHtml: note.scannedContent,
          description: setBrTagNote(note.description),
          // description: note.description,

        })
      }
    }
    if (prevProps.noteDetailPage.isLoadingUpdate !== this.props.noteDetailPage.isLoadingUpdate && this.props.noteDetailPage.isLoadingUpdate === false) {
      this.setState({
        isShow: true,
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }
    if (prevProps.noteDetailPage.isLoadingDelete !== this.props.noteDetailPage.isLoadingDelete && this.props.noteDetailPage.isLoadingDelete === false) {
      const { message } = this.props.noteDetailPage
      this.handleNavigateBack();
      localStorage.setItem("message", message)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  renderFolder = (folder, index) => {
    const { note } = this.state

    return (
      <Button className={`${folder.name === note.folder ? "folder-wrap-active" : "folder-wrap"}`} key={index}>
        <div className="folder-content">
          <span className="icon-folder"></span>
          <span className="name-folder">{folder.name}</span>
        </div>
      </Button>
    )
  }

  handleChange = (html) => {
    this.setState({
      description: html
    })
  }

  handleChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  handleSaveNote = () => {
    const { note, isPinned, editorHtml, description } = this.state;
    const newNote = {
      description: description,
      isPinned: isPinned,
      url: note.url,
      scannedContent: editorHtml,
    }
    console.log(newNote)
    this.props.handleUpdateNote(newNote, note._id);
  }

  handlePinNote = () => {
    this.setState({
      isPinned: !this.state.isPinned,
    })
  }

  handleDeleteNote = () => {
    const id = this.props.match.params.noteId;
    this.props.handleDeleteNote(id);
  }

  handleNavigateBack = () => {
    const { from, folder } = this.props.history.location.state;
    if (folder) {
      this.props.history.push({
        pathname: from,
        state: {
          folder,
        }
      })
    } else {
      this.props.history.push({
        pathname: from,
      })
    }
  }

  handleGoToCourse = (url) => {
    window.open(url, '_blank');
  }

  render() {
    const { isPinned, editorHtml, description, isShow, note } = this.state;
    const { isLoading, isLoadingUpdate, message, error } = this.props.noteDetailPage;
    const editorModule = {
      toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
      imageDrop: true,
    };
    const editorFomat = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'image',
    ]
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#ffc143', marginRight: '10px' }} spin />;
    const antIconSave = <Icon type="loading" style={{ fontSize: 16, color: '#616161', marginRight: '10px' }} spin />;
    return (
      <Row>
        <Helmet>
          <title>NoteDetailPage</title>
          <meta name="description" content="Description of NoteDetailPage" />
        </Helmet>
        <Col span={19}>
          <div className="note-detail">
            <Button className="back-icon" onClick={this.handleNavigateBack}>
              <Icon type="arrow-left" />
            </Button>
            {
              isLoading ?
                <div className='loading-field'>
                  <Spin indicator={antIcon} />
                </div> :
                <div className="note-detail-info">
                  {/* <Input className="note-detail-title" value={getTitleNote(description)} onChange={this.handleChangeDescription} /> */}
                  <div dangerouslySetInnerHTML={{ __html: editorHtml }} className="note-scan" onClick={() => this.handleGoToCourse(note.url)}></div>
                  <div className="note-detail-content">
                    <ReactQuill
                      theme="bubble"
                      bounds=".note-detail-content"
                      placeholder="Let's take a note"
                      modules={editorModule}
                      formats={editorFomat}
                      onChange={this.handleChange}
                      value={description}
                      className="note-detail-area"
                    />
                  </div>
                </div>
            }
          </div>
        </Col>
        <Col span={5}>
          <Layout className="note-detail-side">
            <Header className="note-detail-side-header">
              Note
            </Header>
            <Content>
              <div className="note-detail-side-setting">
                <p>Settings</p>
                {
                  isPinned ?
                    <Button className="btn-pin-active" onClick={this.handlePinNote}>
                      <span className="btn-pin-icon"></span>
                      <span>This note is pinned</span>
                    </Button> :
                    <Button className="btn-pin" onClick={this.handlePinNote}>
                      <span className="btn-pin-icon"></span>
                      <span>Pin this note</span>
                    </Button>
                }

                <Button className="btn-delete" onClick={this.handleDeleteNote}>
                  <span className="btn-delete-icon"></span>
                  <span>Delete this note</span>
                </Button>
                <Button className="btn-save" onClick={this.handleSaveNote}>
                  <Icon type="save" />
                  <span>
                    {isLoadingUpdate ?
                      <Spin indicator={antIconSave} /> : "Save change note"
                    }
                  </span>
                </Button>
              </div>
            </Content>
            <Footer className="note-detail-side-footer">
              <div className={isShow ? 'notification-show' : 'notification'}>
                {
                  message &&
                  <div className='noti-content-success'>
                    <span className='icon-noti accept-icon '></span>
                    <p style={{ fontSize: '14px' }}>{message}</p>
                  </div>
                }
                {
                  error &&
                  <div className='noti-content-error'>
                    <span className='icon-noti deny-icon '></span>
                    <p style={{ fontSize: '14px' }}>{error}</p>
                  </div>
                }
              </div>
            </Footer>
          </Layout>
        </Col>
      </Row>
    );
  }
}

NoteDetailPage.propTypes = {
  handleFetchNoteDetail: PropTypes.func.isRequired,
  handleUpdateNote: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  noteDetailPage: makeSelectNoteDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchNoteDetail: (id) => { dispatch(loadNoteDetail(id)) },
    handleUpdateNote: (note, id) => { dispatch(loadSaveNote(note, id)) },
    handleDeleteNote: (id) => { dispatch(loadDeleteNote(id)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'noteDetailPage', reducer });
const withSaga = injectSaga({ key: 'noteDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NoteDetailPage);
