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
import { Row, Col, Layout } from 'antd';
const { Header, Content } = Layout;

const mockData = [
  {
    id: 1,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['english', 'accounting']
  },
  {
    id: 2,
    color: 'green',
    content: "Lorem ipsum dolor sit amet",
    date: "2019/10/31",
    tags: ['english']
  },
  {
    id: 3,
    content: "Sed magna arcu, fermentum vel porttitor non, fermentum ac metus. Etiam pharetra posuere erat, vitae sagittis felis mattis eget.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['animation']
  },
  {
    id: 4,
    content: "Sed in arcu fermentum, consectetur justo a, lacinia lorem.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['important']
  },
  {
    id: 5,
    content: "Nunc rutrum sapien ut felis ullamcorper, ac euismod felis tempus. Nulla lobortis interdum felis, sollicitudin condimentum dolor rhoncus vitae.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['important', 'advertising']
  },
  {
    id: 6,
    content: "Nulla a arcu a lacus eleifend convallis a tempor eros.",
    color: 'yellow',
    date: "2019/10/31",
    tags: ['quote']
  },
  {
    id: 7,
    content: "Cras dapibus erat erat, quis lobortis nunc placerat quis. Nunc vitae mollis lorem. Sed suscipit porttitor elit. Ut lacinia magna non auctor aliquet. ",
    color: 'yellow',
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
    color: 'yellow',
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
    }
  }

  componentDidMount() {
    this.setState({
      highlights: mockData,
      baseHighlight: mockData
    })
  }
  render() {
    const { highlights } = this.state;
    return (
      <Row>
        <Helmet>
          <title>Highlight Page</title>
          <meta name="description" content="Description of Highlight Page" />
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
              <div className="highLights">
                {
                  highlights.map(highlight => {
                    return <HighLightElement key={highlight.id} highlight={highlight} />
                  })
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
