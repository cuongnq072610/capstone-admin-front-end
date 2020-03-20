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
import ReactQuill from 'react-quill';
import { loadNoteDetail, loadSaveNote, loadDeleteNote } from './actions';
const { Header, Content } = Layout;

const mockDataFolder = [
  {
    id: 1,
    name: "Web development",
  },
  {
    id: 2,
    name: "Digital Marketing",
  },
  {
    id: 3,
    name: "Budgeting",
  },
  {
    id: 4,
    name: "Economy",
  },
  {
    id: 5,
    name: "Marketting",
  },
]
/* eslint-disable react/prefer-stateless-function */
export class NoteDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      editorHtml: '',
      isPinned: false,
      description: "",
    }
  }

  componentDidMount() {
    const id = this.props.match.params.noteId;
    this.props.handleFetchNoteDetail(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.noteDetailPage.note !== this.props.noteDetailPage.note) {
      const { note, isLoading, isLoadingUpdate } = this.props.noteDetailPage
      if (!isLoading && !isLoadingUpdate) {
        this.setState({
          note,
          isPinned: note.isPinned,
          editorHtml: note.scannedContent,
          description: note.description,
        })
      }
    }
    if (prevProps.noteDetailPage.isLoadingDelete !== this.props.noteDetailPage.isLoadingDelete && this.props.noteDetailPage.isLoadingDelete === false) {
      const { message } = this.props.noteDetailPage
      // this.props.history.push({
      //   pathname: '/note',
      // })
      this.handleNavigateBack();
      localStorage.setItem("message", message)
    }
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
      editorHtml: html
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
      course: note.course,
      url: note.url,
      index: note.index,
      scannedContent: editorHtml,
    }
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
    const {from, folder} = this.props.history.location.state;
    if(folder) {
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

  render() {
    const { isPinned, editorHtml, description } = this.state;
    const { isLoading, isLoadingUpdate } = this.props.noteDetailPage;
    const editorModule = {
      toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image', 'video'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    };
    const editorFomat = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'image', 'video'
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
                <Spin indicator={antIcon} /> :
                <div className="note-detail-info">
                  <Input className="note-detail-title" value={description} onChange={this.handleChangeDescription} />
                  <div className="note-detail-content">
                    <ReactQuill
                      theme="bubble"
                      bounds=".note-detail-content"
                      placeholder="Let's take a note"
                      modules={editorModule}
                      formats={editorFomat}
                      onChange={this.handleChange}
                      value={editorHtml}
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
              <div className="note-detail-side-tag">
                <p>Tags</p>
                <Input
                  placeholder="Searh or add new tag"
                  prefix={<Icon type="search" style={{ color: "#ffc143" }} onClick={() => { }} />}
                  onChange={this.onChangeText}
                  // onPressEnter={this.onHandleSubmit}
                  className="tag-search"
                />
                {
                  mockDataFolder.map((folder, index) => this.renderFolder(folder, index))
                }
              </div>
            </Content>
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
