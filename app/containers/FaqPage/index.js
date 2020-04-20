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
import { loadFaq, loadSearchFaq } from './actions';

const { Content, Header } = Layout;
const dataFAQ = [
  {
      "_id": "5e9d745b73c88a2c54b11136",
      "number": 1,
      "askID": "5e996098ac6d06000487e9b1",
      "courseCode": "MLN101",
      "teacherID": {
          "rating": {
              "star_1": -2,
              "star_2": 0,
              "star_3": -6,
              "star_4": -3,
              "star_5": -7
          },
          "courses": [
              "5e74ef80e7179a17e219b9ee",
              "5e6b1c0fa82351000474ce9a",
              "5e7b7c4d3c1f1800048172b3"
          ],
          "_id": "5e73a2d1ce0f903b47c20b38",
          "name": "DuongVT",
          "email": "duongvt@fpt.edu.vn",
          "gender": "male",
          "avatar": "https://lh3.googleusercontent.com/a-/AOh14GghL_erp_D0JdZ4K5KVnrh25JgsaacorcYf_35m",
          "isActive": true,
          "__v": 0
      },
      "scannedContent": "<p>check demo close</p>",
      "askContent": "This is Demo test for close from teacher",
      "answer": "Answer 1",
      "__v": 0
  },
  {
      "_id": "5e9d777ca6adc04690687971",
      "number": 2,
      "askID": "5e9a7f972c777b000481a8a1",
      "courseCode": "MLN101",
      "teacherID": {
          "rating": {
              "star_1": -2,
              "star_2": 0,
              "star_3": -6,
              "star_4": -3,
              "star_5": -7
          },
          "courses": [
              "5e74ef80e7179a17e219b9ee",
              "5e6b1c0fa82351000474ce9a",
              "5e7b7c4d3c1f1800048172b3"
          ],
          "_id": "5e73a2d1ce0f903b47c20b38",
          "name": "DuongVT",
          "email": "duongvt@fpt.edu.vn",
          "gender": "male",
          "avatar": "https://lh3.googleusercontent.com/a-/AOh14GghL_erp_D0JdZ4K5KVnrh25JgsaacorcYf_35m",
          "isActive": true,
          "__v": 0
      },
      "scannedContent": "This course provides a broad introduction to machine learning, datamining, and statistical pattern recognition. Topics include: (i) Supervised learning (parametric/non-parametric algorithms, support vector machines, kernels, neural networks). (ii) Unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning). (iii) Best practices in machine learning (bias/variance theory; innovation process in machine learning and AI). The course will also draw from numerous case studies and applications, so that you'll also learn how to apply learning algorithms to building smart robots (perception, control), text understanding (web search, anti-spam), computer vision, medical informatics, audio, database mining, and other areas.",
      "askContent": "alo thầy ? can u hear me ?",
      "answer": "Answer 2",
      "__v": 0
  },
  {
      "_id": "5e9d778ca6adc04690687972",
      "number": 3,
      "askID": "5e96f23a3ce8b422bcb760e5",
      "courseCode": "CEA201",
      "teacherID": {
          "rating": {
              "star_1": 0,
              "star_2": 0,
              "star_3": 1,
              "star_4": 0,
              "star_5": 2
          },
          "courses": [
              "5e74ef80e7179a17e219b9ee",
              "5e6b1c0fa82351000474ce9a",
              "5e88545bd5704c0004588eb8"
          ],
          "_id": "5e73a1b5ce0f903b47c20b36",
          "name": "LamPT",
          "email": "lampt@fpt.edu.vn",
          "gender": "male",
          "avatar": "https://lh3.googleusercontent.com/a-/AOh14GghL_erp_D0JdZ4K5KVnrh25JgsaacorcYf_35m",
          "isActive": true,
          "__v": 0
      },
      "scannedContent": "Facebook",
      "askContent": "What architecture this website use?",
      "answer": "Answer 3",
      "__v": 0
  }
];
/* eslint-disable react/prefer-stateless-function */
export class FaqPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      displayQuestion: "",
    }
  }

  componentDidMount() {
    this.setState({questions : dataFAQ})
  }

  handleScrollToBottom(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log('Bottom ne ong oi')
    }
  }
  
  handleShowQuestion(question) {
    this.setState({
      displayQuestion : question
    })
  }

  checkUrlInString(s) {
    var urlRE = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
    var matchString = s.match(urlRE);

    if (matchString) {
      let url = `<a href="${matchString[0]}" target="_blank"> ${matchString[0]} </a>`;
      let replaceString = s.replace(matchString[0], url);
      return replaceString; //return the url
    } else {
      return s;
    }
  }
  render() {
    const {questions, displayQuestion} = this.state;
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
             {
              displayQuestion ?
              (
                <div className="question-detai">
                <div className="question-description">
                  <h2>{displayQuestion.askContent}</h2>
                  <p dangerouslySetInnerHTML={{__html : displayQuestion.scannedContent }}></p>
                </div>
                
                <div className="question-answer">
                  <div className="teacher-info">
                    <img src={displayQuestion.teacherID.avatar} alt={displayQuestion.teacherID.name} />
                    <p><span>{displayQuestion.teacherID.name}</span> {displayQuestion.teacherID.email}</p>
                    <p className="date">Mar 26 2019</p>
                  </div>
                  <p className="teacher-reply" dangerouslySetInnerHTML={{__html : this.checkUrlInString(displayQuestion.answer)}}></p>
                </div>
                
              </div>
              ) : 
              <div className="hello-user">
                <h1>Here lie the most important questions and answers
              that might help you with the subject.</h1>
              </div> 
             }
             </Col>
             <Col span={10}>
              <div className="question-wrapper" onScroll={this.handleScrollToBottom}>
                {
                  questions.length > 0 ? questions.map((item,index) => {
                    return (
                      <div className="question" key={index} onClick={() => this.handleShowQuestion(item)}>
                        <p className="code">{item.courseCode}</p>
                        <p className="content">#{item.number} {item.askContent}</p>
                        <p className="date">Mar 26 2019</p>
                      </div>
                    )
                  })  : ""
                }
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
  handleFetchFaqData: PropTypes.func.isRequired,
  handleFetchSearchFaq: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  faqPage: makeSelectFaqPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchFaqData: (page) => { dispatch(loadFaq(page)) },
    handleFetchSearchFaq: (page, key) => { dispatch(loadSearchFaq(page, key)) },
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
