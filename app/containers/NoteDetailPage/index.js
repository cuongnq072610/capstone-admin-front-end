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
import { Row, Col, Button, Icon, Input, Layout } from 'antd';
import "./index.scss";
import ReactQuill from 'react-quill';
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
    }
  }

  componentDidMount() {
    const { note } = this.props.history.location.state
    const htmlText = `${this.convertToH1tag(note.description)}<br>${note.note}`;
    this.setState({
      note,
      editorHtml: htmlText
    })
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

  convertToPtag = (str) => {
    var p = "<p>";
    var newStr = str.concat("</p>");
    return p.concat(newStr);
  }

  convertToH1tag = (str) => {
    var h1 = "<h1>";
    var newStr = str.concat("</h1>");
    return h1.concat(newStr);
  }


  render() {
    const { note, editorHtml } = this.state;
    const editorModule = {
      toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [ 'image', 'video'],
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
    return (
      <Row>
        <Helmet>
          <title>NoteDetailPage</title>
          <meta name="description" content="Description of NoteDetailPage" />
        </Helmet>
        <Col span={19}>
          <div className="note-detail">
            <Button className="back-icon" onClick={() => this.props.history.push("/note")}>
              <Icon type="arrow-left" />
            </Button>
            <div className="note-detail-info">
              {/* <div className="note-detail-title">{note.title}</div> */}
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
                  note.isPinned ?
                    <Button className="btn-pin-active">
                      <span className="btn-pin-icon"></span>
                      <span>This note is pinned</span>
                    </Button> :
                    <Button className="btn-pin">
                      <span className="btn-pin-icon"></span>
                      <span>Pin this note</span>
                    </Button>
                }

                <Button className="btn-delete">
                  <span className="btn-delete-icon"></span>
                  <span>Delete this note</span>
                </Button>
                <Button className="btn-save">
                  <Icon type="save" />
                  <span>Save change note</span>
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  noteDetailPage: makeSelectNoteDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
