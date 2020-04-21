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

/* eslint-disable react/prefer-stateless-function */
export class FaqPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      displayQuestion: "",
      page: 1,
      isSearching: false,
      key: "",
    }
  }

  componentDidMount() {
    const { page } = this.state;
    this.props.handleFetchFaqData(page);
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.state;
    if (prevProps.faqPage.faq !== this.props.faqPage.faq && this.props.faqPage.isLoading === false && prevProps.faqPage.isLoading !== this.props.faqPage.isLoading) {
      const newQuesData = questions.concat(this.props.faqPage.faq)
      this.setState({
        questions: newQuesData,
      })
    }
  }

  handleScrollToBottom(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const { isLoading, totalPage } = this.props.faqPage;
    if (bottom && !isLoading) {
      if (this.state.page === totalPage) {
        return;
      }
      this.setState(prevState => {
        return {
          ...prevState,
          page: prevState.page + 1
        }
      }, () => {
        const { page, key, isSearching } = this.state;
        if (isSearching) {
          this.props.handleFetchSearchFaq(page, key);
        } else {
          this.props.handleFetchFaqData(page);
        }
      })
    }
  }

  handleShowQuestion(question) {
    this.setState({
      displayQuestion: question
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

  handleSearch = (key) => {
    const { page } = this.state;
    this.setState(prevState => {
      return {
        ...prevState,
        isSearching: true,
        key,
        questions: [],
      }
    })
    this.props.handleFetchSearchFaq(page, key);
  }

  handleClear = () => {
    const { page } = this.state;
    this.setState(prevState => {
      return {
        ...prevState,
        isSearching: false,
        key: "",
        questions: [],
      }
    })
    this.props.handleFetchFaqData(page);
  }

  render() {
    const { questions, displayQuestion } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#48C6FF', marginRight: '10px' }} spin />;
    const { isLoading } = this.props.faqPage;

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
              handleSearch={this.handleSearch}
              handleClear={this.handleClear}
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
                          <p dangerouslySetInnerHTML={{ __html: displayQuestion.scannedContent }}></p>
                        </div>

                        <div className="question-answer">
                          <div className="teacher-info">
                            <img src={displayQuestion.teacherID.avatar} alt={displayQuestion.teacherID.name} />
                            <p><span>{displayQuestion.teacherID.name}</span> {displayQuestion.teacherID.email}</p>
                            <p className="date">Mar 26 2019</p>
                          </div>
                          <p className="teacher-reply" dangerouslySetInnerHTML={{ __html: this.checkUrlInString(displayQuestion.answer) }}></p>
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
                <div className="question-wrapper" onScroll={(e) => this.handleScrollToBottom(e)}>
                  {
                    questions.length > 0 ? questions.map((item, index) => {
                      return (
                        <div className="question" key={index} onClick={() => this.handleShowQuestion(item)}>
                          <p className="code">{item.courseCode}</p>
                          <p className="content">#{item.number} {item.askContent}</p>
                          <p className="date">Mar 26 2019</p>
                        </div>
                      )
                    }) : ""
                  }
                  {isLoading && <Spin indicator={antIcon} />}
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
