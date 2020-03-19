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
import { loadHighlight } from './actions';
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
    }
  }

  componentDidMount() {
    this.props.handleFetchHighlights();
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
        baseHighlight: mockData,
        folders: mockDataFolder
      });
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
    const { highlights, folders, isShowFolder } = this.state;
    const { isLoading } = this.props.highLightPage;
    const buttonSort = [
      {
        id: 'greenSortButton',
        color: 'green'
      },
      {
        id: 'redSortButton',
        color: 'red'
      },
      {
        id: 'blueSortButton',
        color: 'blue'
      },
      {
        id: 'yellowSortButton',
        color: 'yellow'
      },
      {
        id: 'orangeSortButton',
        color: 'orange'
      }
    ]
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#40a887', marginRight: '10px' }} spin />;
    return (
      <Row>
        <Helmet>
          <title>Highlight Page</title>
          <meta name="description" content="Description of Highlight Page" />
        </Helmet>
        <Col span={19}>
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
                      mockDataFolder.map((folder, index) => {
                        return (
                          <Button className='grid-item folder-highlight' key={index} onClick={() => this.navigateDetailFolder(folder)}>
                            <span className='folder-highlight-icon'></span>
                            <p className='folder-highlight-name'>{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
                          </Button>
                        )
                      })
                    }
                  </div>
                }
              </div>
              <p className="highlight-type">Recent Highlights</p>
              {
                // isLoading ?
                //   <Spin indicator={antIcon} /> :
                  <div className="highLights grid" >
                    {
                      mockData.map(highlight => {
                        return <HighLightElement key={highlight.id} highlight={highlight} />
                      })
                    }
                  </div>
              }
            </Content>
          </Layout>
        </Col>
        <Col span={5} className="highlight-side-wrapper" style={{ 'height': this.state.windowHeight - 10 }}>
          <Layout className="highlight-side">
            <Header className="filter-head">
              <FormattedMessage {...messages.filter} />
            </Header>
            <Content>
              <div className="sort">
                <p><FormattedMessage {...messages.sort} /></p>
                <div className="sortByColor">
                  {
                    buttonSort.map((item, index) => {
                      return <Button key={index} id={item.id} className={'sortButton background-' + item.color} shape="circle" />
                    })
                  }
                </div>
              </div>
            </Content>
          </Layout>
        </Col>

      </Row>
    );
  }
}

HighLightPage.propTypes = {
  handleFetchHighlights: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  highLightPage: makeSelectHighLightPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchHighlights: () => { dispatch(loadHighlight()) },
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
