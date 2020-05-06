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
import { Row, Layout, Icon, Spin, Col, Button } from 'antd';
import './index.scss';
import { loadFaq, loadSearchFaq, loadFaqDetail, loadCourse, removeFaq, loadFaqByTeacher } from './actions';
import Filter from '../../components/Filter';
import checkUrlInString from '../../utils/checkLink';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class FaqPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      displayQuestion: "",
      page: 1,
      loadingType: "all",
      key: "",
      idChosen: "",
      isSuccess: false,
      chosenCourse: "",
    }
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if (id) {
      this.setState({
        idChosen: id,
      })
      this.props.handleFetchChosenFaq(id);
    }
    this.props.handleLoadCourse();
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.state;
    if (prevProps.faqPage.faq !== this.props.faqPage.faq && this.props.faqPage.isLoading === false && prevProps.faqPage.isLoading !== this.props.faqPage.isLoading) {
      const newQuesData = questions.concat(this.props.faqPage.faq)
      this.setState({
        questions: newQuesData,
      })
    }
    if (prevProps.faqPage.chosen !== this.props.faqPage.chosen && this.props.faqPage.isLoadingDetail === false && prevProps.faqPage.isLoadingDetail !== this.props.faqPage.isLoadingDetail) {
      this.setState({
        displayQuestion: this.props.faqPage.chosen,
      })
    }
    if (this.props.faqPage.isLoadingDelete === false && prevProps.faqPage.isLoadingDelete !== this.props.faqPage.isLoadingDelete && this.props.faqPage.message !== "") {
      this.setState({
        displayQuestion: "",
        questions: [],
      });
      const { page, chosenCourse } = this.state;
      this.props.handleFetchFaqData(page, chosenCourse);
    }
  }

  handleScrollToBottom(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const user = JSON.parse(localStorage.getItem("user"));
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
        const { page, key, loadingType, chosenCourse } = this.state;
        switch (loadingType) {
          case "all":
            this.props.handleFetchFaqData(page, chosenCourse);
            break;
          case "search":
            this.props.handleFetchSearchFaq(page, key);
            break;
          case "filter":
            this.props.handleLoadFaqByTeacher(user.profile, chosenCourse, page);
            break;
          default:
            break;
        }
      })
    }
  }

  handleShowQuestion(question) {
    this.setState({
      displayQuestion: question
    })
  }

  handleSearch = (key) => {
    this.setState(prevState => {
      return {
        ...prevState,
        loadingType: 'search',
        key,
        questions: [],
        page: 1,
        chosenCourse: "",
      }
    }, () => {
      this.props.handleFetchSearchFaq(this.state.page, this.state.key);
    })
  }

  handleClear = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        loadingType: 'all',
        key: "",
        questions: [],
        page: 1,
        chosenCourse: "",
      }
    }, () => {
      this.props.handleLoadCourse();
    })

  }

  handleCopyLink = () => {
    var copyText = document.getElementById("input-fake");
    copyText.select();
    document.execCommand("copy");
    this.setState({
      isSuccess: true,
    })
    this.timer1 = setTimeout(() => {
      this.setState({
        isSuccess: false,
      })
    }, 1000);
  }

  handleChooseCourse = (course) => {
    this.setState({
      chosenCourse: course,
      displayQuestion: ""
    }, () => {
      const { page, chosenCourse } = this.state;
      this.props.handleFetchFaqData(page, chosenCourse);
    })

  }

  handleBack = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === 'student') {
      this.props.history.push("/faq")
    } else if (user.role === 'teacher') {
      this.props.history.push("/tutor/faq")
    }
  }

  handleRemoveFaq = () => {
    const { displayQuestion } = this.state;
    this.props.handleRemoveFaq(displayQuestion._id)
  }

  onResetFilter = () => {
    this.setState({
      questions: [],
      page: 1,
    }, () => {
      const { page, chosenCourse } = this.state;
      this.props.handleFetchFaqData(page, chosenCourse);
    })
  }

  onFilterByStatus = (value) => {
    const user = JSON.parse(localStorage.getItem("user"));
    switch (value) {
      case 'yours':
        this.setState(prevState => {
          return {
            ...prevState,
            loadingType: 'filter',
            questions: [],
            page: 1,
          }
        }, () => {
          this.props.handleLoadFaqByTeacher(user.profile, this.state.chosenCourse, this.state.page);
        })
        break;
      case 'all':
        this.onResetFilter();
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  render() {
    const { questions, displayQuestion, idChosen, isSuccess, chosenCourse, loadingType } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#48C6FF', marginRight: '10px' }} spin />;
    const { isLoading, isLoadingDetail, courses, isLoadingCourse, isLoadingDelete } = this.props.faqPage;
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div className="faq-page">
        <Helmet>
          <title>FAQ Page</title>
          <meta name="description" content="Description of ReportPage" />
        </Helmet>

        <Layout>
          <Header className="faq-page-header">
            <div className='faq-page-name-wrapper'>
              {
                chosenCourse ?
                  <div className="faq-name-course">
                    <Button className='back-btn' onClick={this.handleBack}>
                      <Icon type="arrow-left" />
                    </Button>
                    <p className="faq-page-name">{chosenCourse}</p>
                  </div> :
                  <p className="faq-page-name">FAQ</p>
              }
            </div>
            <div className='faq-page-side'>
              <WrappedSearchBar className="faq-page-search"
                message="Please enter your question key"
                placeholder="I want to find my question"
                type="ask"
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
              />
              {
                (user.role === 'teacher' && chosenCourse) &&
                <Filter
                  type="faq"
                  onReset={this.onResetFilter}
                  onFilter={this.onFilterByStatus}
                />
              }
            </div>
          </Header>

          <Content>
            <Row>
              <Col span={14}>
                {
                  displayQuestion ?
                    (
                      <div className="question-detai">
                        <div className="question-description">
                          <div className="question-description-header">
                            <h3>#{displayQuestion.number}</h3>
                            <input id="input-fake" type="text" value={`localhost:3002/faq/?id=${displayQuestion._id}`} readOnly />
                            {/* <input id="input-fake" type="text" value={`noteitfu.herokuapp.com/faq/${displayQuestion._id}`} readOnly/> */}
                            <div className='question-description-header-side'>
                              <span className={isSuccess ? `icon-success-show` : `icon-success-none`}></span>
                              {
                                user.role === 'teacher' &&
                                <Button className='btn-delete' type='danger' onClick={this.handleRemoveFaq}>
                                  {
                                    isLoadingDelete ?
                                      <Spin indicator={antIcon} /> :
                                      <span>Delete this faq <Icon type="delete" style={{ fontSize: '20px' }} /></span>
                                  }
                                </Button>
                              }
                              <Button className='btn-copy' onClick={this.handleCopyLink}>
                                Copy link to this faq <Icon type="copy" style={{ fontSize: '20px' }} />
                              </Button>
                            </div>
                          </div>
                          <h2>{displayQuestion.askContent}</h2>
                          <p dangerouslySetInnerHTML={{ __html: displayQuestion.scannedContent }}></p>
                        </div>

                        <div className="question-answer">
                          <div className="teacher-info">
                            <img src={displayQuestion.teacherID.avatar} alt={displayQuestion.teacherID.name} />
                            <p><span>{displayQuestion.teacherID.name}</span> {displayQuestion.teacherID.email}</p>
                            <p className="date">Mar 26 2019</p>
                          </div>
                          <p className="teacher-reply" dangerouslySetInnerHTML={{ __html: checkUrlInString(displayQuestion.answer) }}></p>
                        </div>
                      </div>
                    ) :
                    idChosen ?
                      isLoadingDetail && <Spin indicator={antIcon} />
                      :
                      <div className="hello-user">
                        <h1>Here lie the most important questions and answers
              that might help you with the subject.</h1>
                      </div>
                }
              </Col>
              <Col span={10}>
                {
                  chosenCourse || loadingType === 'search' ?
                    <div className="question-wrapper" onScroll={(e) => this.handleScrollToBottom(e)}>
                      {
                        isLoading ?
                          "" :
                          questions.length > 0 ? questions.map((item, index) => {
                            return (
                              <div className="question" key={index} onClick={() => this.handleShowQuestion(item)}>
                                <p className="code">{item.courseCode}</p>
                                <p className="content">#{item.number} {item.askContent}</p>
                                <p className="date">{item.date}</p>
                              </div>
                            )
                          }) : <p>There is no faq in this course</p>
                      }
                      {isLoading && <Spin indicator={antIcon} />}
                    </div> :
                    isLoadingCourse ?
                      <Spin indicator={antIcon} /> :
                      <div className="question-wrapper">
                        {
                          (courses && courses.length > 0) ? courses.map((item, index) => {
                            return (
                              <div className="question" key={index} onClick={() => this.handleChooseCourse(item.courseCode)}>
                                <p className="code">{item.courseCode}</p>
                                <p className="content">{item.courseName}</p>
                              </div>
                            )
                          }) : ""
                        }
                      </div>
                }
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
  handleFetchChosenFaq: PropTypes.func,
  handleLoadCourse: PropTypes.func.isRequired,
  handleRemoveFaq: PropTypes.func.isRequired,
  handleLoadFaqByTeacher: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  faqPage: makeSelectFaqPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchFaqData: (page, course) => { dispatch(loadFaq(page, course)) },
    handleFetchSearchFaq: (page, key) => { dispatch(loadSearchFaq(page, key)) },
    handleFetchChosenFaq: (id) => { dispatch(loadFaqDetail(id)) },
    handleLoadCourse: () => { dispatch(loadCourse()) },
    handleRemoveFaq: (id) => { dispatch(removeFaq(id)) },
    handleLoadFaqByTeacher: (teacherId, course, page) => { dispatch(loadFaqByTeacher(teacherId, course, page)) }
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
