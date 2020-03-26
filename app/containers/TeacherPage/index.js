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
import { loadTeacher, searchTeacher, updateActiveTeacher, loadDepartment } from './actions';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class TeacherPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            departments: [],
            teachers: [],
            baseTeachers: [],
            toggleInfo: false,
            selectedTeacher: {},
            selectedRow: "",
        }
    }

    componentDidMount() {
        this.props.fetchTeacher();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.teacherPage.teachers !== this.props.teacherPage.teachers) {
            const { teachers, departments } = this.props.teacherPage;

            const fomatTeachers = teachers.map((teacher, index) => {
                return { ...teacher, key: `${index}` }
            })
            this.setState({
                departments: departments,
                teachers: fomatTeachers,
                baseTeachers: fomatTeachers,
            })
        }
    }

    onResetFilter = () => {
        const { baseTeachers } = this.state;
        this.setState({
            teachers: baseTeachers,
        })
    }

    checkDepartment = (departments, checkDepartments) => {
        const nameCheckDepartments = checkDepartments.map(department => department.name);
        // check exist in course departments
        const checkExisted = (department) => departments.indexOf(department) >= 0
        //  tests whether all elements in the array pass the test 
        return nameCheckDepartments.every(checkExisted);
    }

    checkTeacherHaveCourse = (teacher, departments) => {
        // check course of teacher have the dearptments of filter
        const teacherExistHaveCourse = teacher.courses.filter((course, index) => {
            return this.checkDepartment(course.departments, departments) === true;
        })
        return teacherExistHaveCourse;
    }

    filterByDepartment = (departments) => {
        const { baseTeachers } = this.state;
        if (!departments || departments.length === 0) {
            this.onResetFilter();
        } else {
            const filterTeacher = baseTeachers.filter((teacher, index) => {
                if (this.checkTeacherHaveCourse(teacher, departments).length > 0) {
                    return teacher;
                }
            })
            this.setState({
                teachers: filterTeacher
            })
        }
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
        const { departments, teachers, toggleInfo, selectedTeacher, selectedRow } = this.state;
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
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                height: '100px',
                            }}
                        >
                            <WrappedSearchBar
                                message="Please enter your teacher's name"
                                placeholder="I want to find teachers"
                                type="teacher"
                                handleSearch={this.handleSearch}
                                handleClear={this.handleClear}
                            />
                            <Filter
                                departments={departments}
                                onReset={this.onResetFilter}
                                onFilter={this.filterByActive}
                                type="teacher"
                            />
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
