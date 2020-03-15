/**
 *
 * NoteFolderPage
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
import makeSelectNoteFolderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Layout, Icon } from 'antd';
import WrappedSearchBar from '../../components/SearchBar';
import { Link } from 'react-router-dom';
import './index.scss';
const { Header, Content } = Layout;
/* eslint-disable react/prefer-stateless-function */
export class NoteFolderPage extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        folder: {}
      }
  }
  componentDidMount() {
    const { folder } = this.props.history.location.state;
    this.setState({
      folder
    })
  }

  renderFolderNoteName = (name, code) => {
    return code + ' - ' + name;
  }

  render() {
    const { folder } = this.state;
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
        </Layout>
      </div>
    );
  }
}

NoteFolderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  noteFolderPage: makeSelectNoteFolderPage(),
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

const withReducer = injectReducer({ key: 'noteFolderPage', reducer });
const withSaga = injectSaga({ key: 'noteFolderPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NoteFolderPage);
