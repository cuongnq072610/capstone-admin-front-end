/**
 *
 * NotePage
 *
 */

import React from 'react';
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
import { Row, Layout, Col, Icon, Button, Input } from 'antd';
import { loadNote, loadFolder } from './actions';
const { Content, Header } = Layout;

const mockData = [
  {
    id: 1,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isPinned: false,
    date: "2019/10/31",
    folder: "Economy",
  },
  {
    id: 2,
    title: "What is Lorem Ipsum CHECK",
    content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
    isPinned: true,
    date: "2019/5/15",
    folder: "Marketting",
  },
  {
    id: 3,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "Economy",
  },
  {
    id: 4,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "Economy",
  },
  {
    id: 5,
    title: "What is Lorem Ipsum CHECK",
    content: "",
    isPinned: true,
    date: "2019/2/15",
    folder: "Economy",
  },
  {
    id: 6,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "Economy",
  },
  {
    id: 7,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "Marketting",
  },
  {
    id: 8,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "Economy",
  },
  {
    id: 9,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "Marketting",
  },
  {
    id: 10,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "Economy",
  },
  {
    id: 11,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "Budgeting",
  },
  {
    id: 12,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "Marketting",
  },
  {
    id: 13,
    title: "What is Lorem Ipsum CHECK LAST",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "Economy",
  },
];

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
export class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      baseNotes: [],
      folderChosen: {},
      textValue: "",
      folders: [],
    }
  }

  componentDidMount() {
    this.setState({
      notes: mockData,
      folders: mockDataFolder,
      baseNotes: mockData,
    })
  }

  navigateDetail = (note) => {
    history.push({
      pathname: `/note/${note.id}`,
      state: {
        note: note
      }
    })
  }

  onHandleChosenFolder = (folder) => {
    const { folderChosen, baseNotes } = this.state;
    if (folder !== folderChosen) {
      var newArrNotes = baseNoes.filter(note => note.folder === folder.name)
      this.setState({
        folderChosen: folder,
        notes: newArrNotes,
      })
    } else {
      this.setState({
        folderChosen: {},
        notes: mockData,
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

  onHandleSubmit = () => {
    const { textValue, folders } = this.state;
    var newArrFolders = [...folders, { id: folders.length + 2, name: textValue }]
    this.setState({
      folders: newArrFolders
    })
  }

  onChangeText = (e) => {
    this.setState({
      textValue: e.target.value,
    })
  }

  countNote = (type) => {
    const { notes } = this.state;
    var count = 0;
    if (type === "pinned") {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].isPinned === true) {
          count++
        }
      }
    } else {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].isPinned === false) {
          count++
        }
      }
    }
    return count
  }

  render() {
    const { notes, folders } = this.state;
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
              <div className="note-wrap">
                <p className="note-type"><FormattedMessage {...messages.titlePinned} /></p>
                <div className={this.countNote("pinned") < 3 ? "note-wrap-less-three" : "note-container"}>
                  {
                    notes.map((note, index) => {
                      if (note.isPinned) {
                        return (
                          <Note key={index} note={note} navigateDetail={() => this.navigateDetail(note)} />
                        )
                      }
                    })
                  }
                </div>
              </div>
              <div className="note-wrap">
                <p className="note-type"><FormattedMessage {...messages.titleOther} /></p>
                <div className={this.countNote("note-pinned") < 3 ? "note-wrap-less-three" : "note-container"}>
                  {
                    notes.map((note, index) => {
                      if (!note.isPinned) {
                        return (
                          <Note key={index} note={note} navigateDetail={() => this.navigateDetail(note)} />
                        )
                      }
                    })
                  }
                </div>
              </div>
            </Content>
          </Layout>
        </Col>
        <Col span={5}>
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
                  folders.map((folder, index) => this.renderFolder(folder, index))
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
};

const mapStateToProps = createStructuredSelector({
  notePage: makeSelectNotePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadNote: () => { dispatch(loadNote()) },
    handleLoadFolder: () => { dispatch(loadFolder()) },
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
