/**
 *
 * TeacherPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Layout, Col, Table } from 'antd';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTeacherPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Filter from '../../components/Filter';
import WrappedSearchBar from '../../components/SearchBar';
import columns from './tableCol';

import "./index.scss";
import TeacherInfo from './TeacherInfo';
import { loadTeacher, searchTeacher, updateActiveTeacher, loadCourse } from './actions';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class TeacherPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            teachers: [],
            baseTeachers: [],
            toggleInfo: false,
            selectedTeacher: {},
            selectedRow: "",
            courses: [],
        }
    }

    componentDidMount() {
        this.props.fetchTeacher();
        this.props.fetchCourse();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.teacherPage.teachers !== this.props.teacherPage.teachers) {
            const { teachers } = this.props.teacherPage;

            const fomatTeachers = teachers.map((teacher, index) => {
                return { ...teacher, key: `${index}` }
            })
            this.setState({
                teachers: fomatTeachers,
                baseTeachers: fomatTeachers,
            })
        }
        if (prevProps.teacherPage.courses !== this.props.teacherPage.courses) {
            const { courses } = this.props.teacherPage;
            const newCourses = courses.map(course => course.courseName)
            this.setState({
                courses: newCourses,
            })
        }
    }

    onResetFilter = () => {
        const { baseTeachers } = this.state;
        this.setState({
            teachers: baseTeachers,
        })
    }

    filterByActive = (activeType) => {
        const { baseTeachers } = this.state;
        switch (activeType) {
            case "active":
                const filterTeachersActive = baseTeachers.filter(teacher => teacher.isActive === true);
                this.setState({
                    teachers: filterTeachersActive,
                })
                break;
            case "inactive":
                const filterTeachersInactive = baseTeachers.filter(teacher => teacher.isActive === false);
                this.setState({
                    teachers: filterTeachersInactive,
                })
                break;
            default:
                break;
        }
    }

    filterByCourse = (course) => {
        const { baseTeachers } = this.state;
        const filterTeacher = baseTeachers.map(teacher => {
            const courseNames = teacher.courses.map(course => course.courseName)
            return courseNames.includes(course) ? teacher : "";
        })
        console.log(filterTeacher)
    }

    onToggleInfo = (teacher, index) => {
        this.setState({
            toggleInfo: true,
            selectedTeacher: teacher,
            selectedRow: index
        })
    }

    onToggleBack = () => {
        this.setState({
            toggleInfo: false,
            selectedTeacher: {},
            selectedRow: {}
        })
    }

    onToggleActive = (id, data) => {
        this.props.toggleActiveTeacher(id, data);
    }

    handleSearch = (key) => {
        this.props.fetchSearchTeacher(key)
    }

    handleClear = () => {
        this.props.fetchTeacher();
    }

    render() {
        const { courses, teachers, toggleInfo, selectedTeacher, selectedRow } = this.state;
        const { isLoading, isLoadingUpdate } = this.props.teacherPage;
        return (
            <Row>
                <Helmet>
                    <title>Teacher Page</title>
                    <meta name="description" content="Description of TeacherPage" />
                </Helmet>
                <Col span={toggleInfo ? 19 : 24}>
                    <Layout className={toggleInfo ? "teacher-page" : ""} >
                        <Header
                            style={{
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '100px',
                            }}
                        >
                            <p className='teacher-page-name'>Teachers</p>
                            <div className="search-filter-side">
                                <WrappedSearchBar
                                    message="Please enter your teacher's name"
                                    placeholder="I want to find teachers"
                                    type="teacher"
                                    handleSearch={this.handleSearch}
                                    handleClear={this.handleClear}
                                />
                                <Filter
                                    courses={courses}
                                    onReset={this.onResetFilter}
                                    onFilter={this.filterByActive}
                                    onFilterCourse={this.filterByCourse}
                                    type="teacher"
                                />
                            </div>
                        </Header>
                        <Content>
                            <Row>
                                <Table
                                    columns={columns}
                                    dataSource={teachers}
                                    className="teacherTable"
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: e => this.onToggleInfo(record, rowIndex)
                                        }
                                    }}
                                    rowClassName={(record, index) => {
                                        return index === selectedRow ? "active-row" : ""
                                    }}
                                    loading={isLoading}
                                />
                            </Row>
                        </Content>
                    </Layout>
                </Col>
                {
                    toggleInfo &&
                    <Col span={5}>
                        <TeacherInfo
                            teacherInfo={selectedTeacher}
                            onBack={this.onToggleBack}
                            onActive={this.onToggleActive}
                            isLoading={isLoadingUpdate}
                        />
                    </Col>
                }
            </Row>
        );
    }
}

TeacherPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
    teacherPage: makeSelectTeacherPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        fetchTeacher: () => { dispatch(loadTeacher()) },
        fetchSearchTeacher: (key) => { dispatch(searchTeacher(key)) },
        toggleActiveTeacher: (id, data) => { dispatch(updateActiveTeacher(id, data)) },
        fetchCourse: () => { dispatch(loadCourse()) },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'teacherPage', reducer });
const withSaga = injectSaga({ key: 'teacherPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(TeacherPage);
