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
import { Row, Layout, Col, Icon, Button } from 'antd';
const { Content, Header } = Layout;

const mockData = [
  {
    id: 1,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isPinned: false,
    date: "2019/10/31",
    folder: "economy",
  },
  {
    id: 2,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/5/15",
    folder: "marketting",
  },
  {
    id: 3,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 4,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 5,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 6,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: true,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 7,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 8,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 9,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 10,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 11,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "marketting",
  },
  {
    id: 12,
    title: "What is Lorem Ipsum",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isPinned: false,
    date: "2019/2/15",
    folder: "marketting",
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
]
/* eslint-disable react/prefer-stateless-function */
export class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: [],
      folderChosen: {},
    }
  }

  navigateDetail = (id) => {
    history.push({
      pathname: '/teacher',
    })
  }

  onHandleChosenFolder = (folder) => {
    this.setState({
      folderChosen: folder
    })
  }

  renderFolder = (folder, index) => {
    const { folderChosen } = this.state;
    return (
      <Button className={`${folder.name === folderChosen.name? "folder-wrap-active" : "folder-wrap"}`} key={index} onClick={() => this.onHandleChosenFolder(folder)}>
        <span className="icon-folder"></span>
        <span className="name-folder">{folder.name}</span>
      </Button>
    )
  }

  render() {
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
                <p className="note-type">Pinned</p>
                <div className="note-container">
                  {
                    mockData.map((note, index) => {
                      if (note.isPinned) {
                        return (
                          <Note key={index} note={note} navigateDetail={() => this.navigateDetail(note.id)} />
                        )
                      }
                    })
                  }
                </div>
              </div>
              <div className="note-wrap">
                <p className="note-type">Other</p>
                <div className="note-container">
                  {
                    mockData.map((note, index) => {
                      if (!note.isPinned) {
                        return (
                          <Note key={index} note={note} navigateDetail={() => this.navigateDetail(note.id)} />
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
              Filter
            </Header>
            <Content>
              <div className="sort">
                <p>Sort By</p>
                <Button className="btn-sort">
                  <Icon type="arrow-down" style={{ fontSize: '16px' }} />
                  <span>Time added</span>
                </Button>
              </div>
              <div className="folder">
                <p>Folders</p>
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

NotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notePage: makeSelectNotePage(),
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

const withReducer = injectReducer({ key: 'notePage', reducer });
const withSaga = injectSaga({ key: 'notePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NotePage);
