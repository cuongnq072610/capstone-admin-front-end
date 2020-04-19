/**
 *
 * FaqPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFaqPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WrappedSearchBar from '../../components/SearchBar';
import { Select, Row, Layout, Icon, Spin, Col, DatePicker, Button, Table } from 'antd';
import './index.scss';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class FaqPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      displayQuestion: "",
    }
  }

  componentDidMount() {
    
  }

  checkUrlInString(s) {
    var urlRE= new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
    var matchString = s.match(urlRE);
    
    if(matchString) {
      let url = `<a href="${matchString[0]}" target="_blank"> ${matchString[0]} </a>`;
      let replaceString = s.replace(matchString[0], url);
      return replaceString; //return the url
    }else {
      return s;
    }
  }
  render() {
    return (
      <div className="faq-page">
        <Helmet>
          <title>FAQ Page</title>
          <meta name="description" content="Description of ReportPage" />
        </Helmet>

        <Layout>
          <Header className="faq-page-header">
            <div className='faq-page-name-wrapper'>
              <p className="faq-page-name">FAQ</p>
            </div>
            <WrappedSearchBar className="faq-page-search"
              message="Please enter your question key" 
              placeholder="I want to find my question"
              type="ask"
              // handleSearch={this.handleSearch}
              // handleClear={this.handleClear}
            />
          </Header>

          <Content>
            <Row>
             <Col span={14}>
              <div className="question-detai">
                <div className="question-description">
                  <h2>#12 Why the creator of Android left his own company?</h2>
                  <p>
                    What Google did not make public was that an employee had accused Mr. Rubin of
                    sexual misconduct. The woman, with whom Mr. Rubin had been having an
                    extramarital relationship, said he coerced her into performing oral sex in a hotel
                    room in 2013
                  </p>
                </div>
                
                <div className="question-answer">
                  <div className="teacher-info">
                    <img src="https://i.imgur.com/HBX2JUu.png" alt="teacher avatar" />
                    <p><span>LamPD</span> lampd@fe.edu.vn</p>
                    <p className="date">Mar 26 2019</p>
                  </div>
                  <p className="teacher-reply" dangerouslySetInnerHTML={{__html : this.checkUrlInString(`Check out the link down below: https://www.nytimes.com/2018/10/25/technology/google-sexual-harassment-andy-rubin.html`)}}></p>
                </div>
                
              </div>
             </Col>
             <Col span={10}>
              <div className="question-wrapper">
                <div className="question">
                  <p className="code">DBI231</p>
                  <p className="content">#12 Why the creator of Android left his own company?</p>
                  <p className="date">Mar 26 2019</p>
                </div>
                <div className="question">
                  <p className="code">DBI231</p>
                  <p className="content">#904 Will this course mention operational data running in entrepreneurs?</p>
                  <p className="date">Mar 26 2019</p>
                </div>
              </div>
             </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

FaqPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  faqPage: makeSelectFaqPage(),
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

const withReducer = injectReducer({ key: 'faqPage', reducer });
const withSaga = injectSaga({ key: 'faqPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FaqPage);
