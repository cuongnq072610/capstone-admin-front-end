/**
 *
 * HighLightFolderPage
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
import makeSelectHighLightFolderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Layout, Col, Row, Icon, Button, Spin } from 'antd';
import Masonry from 'masonry-layout'
import WrappedSearchBar from '../../components/SearchBar';
import HighLightElement from './HighlightElement';
import './index.scss';
import { Link } from 'react-router-dom';
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
export class HighLightFolderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {},
      windowHeight: window.innerHeight,
    }
  }

  componentDidMount() {
    const { folder } = this.props.history.location.state;
    this.setState({
      folder,
    })
  }

  componentDidUpdate() {
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
  }

  renderFolderNoteName = (name, code) => {
    return code + ' - ' + name;
  }

  render() {
    const { folder, windowHeight } = this.state;
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
    ];
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#40a887', marginRight: '10px' }} spin />;

    return (
      <div className='highlight-folder-page'>
        <Helmet>
          <title>HighLightFolderPage</title>
          <meta
            name="description"
            content="Description of HighLightFolderPage"
          />
        </Helmet>
        <Col span={19}>
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
            <div className="highlight-folder-page-header">
              <Link to="/highlight">
                <Icon type="arrow-left" style={{ fontSize: '20px', color: '#53DBB1', marginBottom: '25px', marginRight: '10px' }} />
              </Link>
              <p className="highlight-page-name">{this.renderFolderNoteName(folder.courseName, folder.courseCode)}</p>
            </div>
            <WrappedSearchBar
              message="Please enter your note's name"
              placeholder="I want to find my notes"
              type="highlight"
            />
          </Header>
          <Content>
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
        </Col>
        <Col span={5} className="highlight-side-wrapper" style={{ 'height': windowHeight - 10 }}>
          <Layout className="highlight-side">
            <Header className="filter-head">
              Filter
            </Header>
            <Content>
              <div className="sort">
                <p>SORT BY</p>
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
      </div>
    );
  }
}

HighLightFolderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  highLightFolderPage: makeSelectHighLightFolderPage(),
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

const withReducer = injectReducer({ key: 'highLightFolderPage', reducer });
const withSaga = injectSaga({ key: 'highLightFolderPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HighLightFolderPage);
