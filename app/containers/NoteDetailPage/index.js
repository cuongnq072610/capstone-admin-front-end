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
      note: {}
    }
  }

  componentDidMount() {
    const { note } = this.props.history.location.state
    this.setState({
      note
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
  render() {
    const { note } = this.state
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
              <div className="note-detail-title">{note.title}</div>
              <div className="note-detail-content">
                {note.content}
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
