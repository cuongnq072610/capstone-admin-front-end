/**
 *
 * HighLightPage
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
import makeSelectHighLightPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WrappedSearchBar from '../../components/SearchBar';
import HighLightElement from './HighlightElement';
import { Row, Layout, Col, Icon, Button, Input, Spin } from 'antd';
import "./index.scss";
import Masonry from 'masonry-layout'
import { loadHighlight, loadStudentCourses } from './actions';
const { Header, Content } = Layout;

const mockData = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    color: 'green',
    date: "2019/10/31",
    tags: ['english', 'accounting']
  },
  {
    id: 2,
    color: 'blue',
    text: "Lorem ipsum dolor sit amet",
    date: "2019/10/31",
    tags: ['english']
  },
  {
    id: 3,
    text: "Sed magna arcu, fermentum vel porttitor non, fermentum ac metus. Etiam pharetra posuere erat, vitae sagittis felis mattis eget.",
    color: 'red',
    date: "2019/10/31",
    tags: ['animation']
  },
  {
    id: 4,
    text: "Sed in arcu fermentum, consectetur justo a, lacinia lorem, justo alor.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['important']
  },
  {
    id: 5,
    text: "Nunc rutrum sapien ut felis ullamcorper, ac euismod felis tempus. Nulla lobortis interdum felis, sollicitudin condimentum dolor rhoncus vitae.",
    color: 'green',
    date: "2019/10/31",
    tags: ['important', 'advertising']
  },
  {
    id: 6,
    text: "Nulla a arcu a lacus eleifend convallis a tempor eros.",
    color: 'blue',
    date: "2019/10/31",
    tags: ['quote']
  },
  {
    id: 7,
    text: "Cras dapibus erat erat, quis lobortis nunc placerat quis. Nunc vitae mollis lorem. Sed suscipit porttitor elit. Ut lacinia magna non auctor aliquet. ",
    color: 'orange',
    date: "2019/10/31",
    tags: ['quote']
  },
  {
    id: 8,
    text: "In sem sapien, gravida sed sem non, pellentesque malesuada felis.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['important']
  },
  {
    id: 9,
    text: "Aenean maximus sodales ex, ut rhoncus lectus hendrerit ac. Mauris vestibulum diam justo, id efficitur lorem consequat a. Praesent eu rutrum tortor.",
    color: 'red',
    date: "2019/10/31",
    tags: ['advertising']
  }
];

/* eslint-disable react/prefer-stateless-function */
export class HighLightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlights: [],
      baseHighlight: [],
      folderChosen: {},
      textValue: "",
      folders: [],
      windowHeight: window.innerHeight,
      isShowFolder: true,
      courses: [],
    }
  }

  componentDidMount() {
    this.props.handleFetchHighlights();
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.handleLoadCourse(user.profile);
  }

  componentDidUpdate(prevProps) {
    var elem = document.querySelector('.grid');
    var msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item',
      columnWidth: 10,
      gutter: 10,
      horizontalOrder: true
    });
    if (prevProps.highLightPage.highlights !== this.props.highLightPage.highlights) {
      this.setState({
        highlights: this.props.highLightPage.highlights,
      });
    }
    if (prevProps.highLightPage.courses !== this.props.highLightPage.courses) {
      this.setState({
        courses: this.props.highLightPage.courses,
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

  handleShowFolder = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowFolder: !prevState.isShowFolder
      }
    })
  }

  renderFolderNoteName = (name, code) => {
    return code + ' - ' + name;
  }

  navigateDetailFolder = (folder) => {
    this.props.history.push({
      pathname: `/highlight/${folder.courseCode}`,
      state: {
        folder
      }
    })
  }

  render() {
    const { highlights, courses, isShowFolder } = this.state;
    const { isLoading, isLoadingCourse } = this.props.highLightPage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#40a887', marginRight: '10px' }} spin />;
    return (
      <Row>
        <Helmet>
          <title>Highlight Page</title>
          <meta name="description" content="Description of Highlight Page" />
        </Helmet>
        <Col>
          <Layout className="highlight-page">
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
              <p className="highlight-page-name">HighLights</p>
              <WrappedSearchBar
                message="Please enter your note's name"
                placeholder="I want to find my notes"
                type="highlight"
              />
            </Header>
            <Content>
              <div className='highlight-folder'>
                <Button className='highlight-folder-title' onClick={this.handleShowFolder}>
                  <p>Folders</p>{isShowFolder ? <Icon type="down" style={{ color: '#111' }} /> : <Icon type="up" style={{ color: '#111' }} />}
                </Button>
                {
                  isShowFolder &&
                  <div className='grid folder-container'>
                    {
                      isLoadingCourse ?
                        <Spin indicator={antIcon} /> :
                        courses.length > 0 ?
                          courses.map((folder, index) => {
                            return (
                              <Button className='grid-item folder-highlight' key={index} onClick={() => this.navigateDetailFolder(folder)}>
                                <span className='folder-highlight-icon'></span>
                                <p className='folder-highlight-name'>{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
                              </Button>
                            )
                          }) : <span style={{ color: "#8c8a82" }}>You don't join any courses</span>
                    }
                  </div>
                }
              </div>
              <p className="highlight-type">Recent Highlights</p>
              {
                isLoading ?
                  <Spin indicator={antIcon} /> :
                  <div className="highLights grid" >
                    {
                      highlights.length > 0 ?
                        highlights.map(highlight => {
                          return <HighLightElement key={highlight.id} highlight={highlight} />
                        }) : <span style={{ color: "#8c8a82" }}>You don't have any highlights</span>
                    }
                  </div>
              }
            </Content>
          </Layout>
        </Col>
      </Row>
    );
  }
}

HighLightPage.propTypes = {
  handleFetchHighlights: PropTypes.func.isRequired,
  handleLoadCourse: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  highLightPage: makeSelectHighLightPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchHighlights: () => { dispatch(loadHighlight()) },
    handleLoadCourse: (id) => { dispatch(loadStudentCourses(id)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'highLightPage', reducer });
const withSaga = injectSaga({ key: 'highLightPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HighLightPage);
