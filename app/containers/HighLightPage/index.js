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
import { Row, Layout, Col, Icon, Button, Input } from 'antd';
import "./index.scss";
import Masonry from 'masonry-layout'
const { Header, Content } = Layout;

const mockData = [
  {
    id: 1,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    color: 'green',
    date: "2019/10/31",
    tags: ['english', 'accounting']
  },
  {
    id: 2,
    color: 'blue',
    content: "Lorem ipsum dolor sit amet",
    date: "2019/10/31",
    tags: ['english']
  },
  {
    id: 3,
    content: "Sed magna arcu, fermentum vel porttitor non, fermentum ac metus. Etiam pharetra posuere erat, vitae sagittis felis mattis eget.",
    color: 'red',
    date: "2019/10/31",
    tags: ['animation']
  },
  {
    id: 4,
    content: "Sed in arcu fermentum, consectetur justo a, lacinia lorem, justo alor.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['important']
  },
  {
    id: 5,
    content: "Nunc rutrum sapien ut felis ullamcorper, ac euismod felis tempus. Nulla lobortis interdum felis, sollicitudin condimentum dolor rhoncus vitae.",
    color: 'green',
    date: "2019/10/31",
    tags: ['important', 'advertising']
  },
  {
    id: 6,
    content: "Nulla a arcu a lacus eleifend convallis a tempor eros.",
    color: 'blue',
    date: "2019/10/31",
    tags: ['quote']
  },
  {
    id: 7,
    content: "Cras dapibus erat erat, quis lobortis nunc placerat quis. Nunc vitae mollis lorem. Sed suscipit porttitor elit. Ut lacinia magna non auctor aliquet. ",
    color: 'orange',
    date: "2019/10/31",
    tags: ['quote']
  },
  {
    id: 8,
    content: "In sem sapien, gravida sed sem non, pellentesque malesuada felis.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['important']
  },
  {
    id: 9,
    content: "Aenean maximus sodales ex, ut rhoncus lectus hendrerit ac. Mauris vestibulum diam justo, id efficitur lorem consequat a. Praesent eu rutrum tortor.",
    color: 'red',
    date: "2019/10/31",
    tags: ['advertising']
  }
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
export class HighLightPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlights: [],
      baseHighlight: [],
      folderChosen: {},
      textValue: "",
      folders: [],
    }
  }

  componentDidMount() {
    this.setState({
      highlights: mockData,
      baseHighlight: mockData,
      folders: mockDataFolder
    })

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
  
  render() {
    const { highlights , folders} = this.state;
    const buttonSort = [
      {
        id : 'greenSortButton',
        color : 'green'
      },
      {
        id : 'redSortButton',
        color : 'red'
      },
      {
        id : 'blueSortButton',
        color : 'blue'
      },
      {
        id : 'yellowSortButton',
        color : 'yellow'
      },
      {
        id : 'orangeSortButton',
        color : 'orange'
      }
    ]
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
              <div className="highLights grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 10, "gutter": 10, "horizontalOrder": true}'>
                {
                  highlights.map(highlight => {
                    return <HighLightElement key={highlight.id} highlight={highlight} />
                  })
                }
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
                <div className="sortByColor">
                  {
                    buttonSort.map((item,index) => {
                      return <Button key={index} id={item.id} className={'sortButton background-'+item.color} shape="circle" />
                    })
                  }
                </div>
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

HighLightPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  highLightPage: makeSelectHighLightPage(),
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

const withReducer = injectReducer({ key: 'highLightPage', reducer });
const withSaga = injectSaga({ key: 'highLightPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HighLightPage);
