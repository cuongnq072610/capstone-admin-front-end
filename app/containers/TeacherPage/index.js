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
import { loadTeacher, searchTeacher, updateActiveTeacher } from './actions';

const { Content, Header } = Layout;

const mockData2 = [
    "Business", "Communication Business", "Communication", "Finance", "Graphic Design"
];

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
            const { teachers } = this.props.teacherPage;

            const fomatTeachers = teachers.map((teacher, index) => {
                return { ...teacher, key: `${index}`, avatar: `/app/assets/png/girl-1.png` }
            })
            this.setState({
                departments: mockData2,
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
        return checkDepartments.some(department => departments.indexOf(department) >= 0);
    }

    filterByDepartment = (departments) => {
        const { baseTeachers } = this.state;
        if (!departments || departments.length === 0) {
            this.onResetFilter();
        } else {
            const filterTeacher = baseTeachers.filter((teacher, index) => {
                return this.checkDepartment(teacher.departments, departments) === true;
            })
            this.setState({
                teachers: filterTeacher
            })
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
        const { isLoading } = this.props.teacherPage;
        console.log(teachers)
        return (
            <Row>
                <Helmet>
                    <title>Teacher Page</title>
                    <meta name="description" content="Description of TeacherPage" />
                </Helmet>
                <Col span={19} >
                    <Layout className="teacher-page">
                        <Header
                            style={{
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
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
                <Col span={5}>
                    {
                        toggleInfo === false ?
                            <Filter
                                departments={departments}
                                onReset={this.onResetFilter}
                                onFilter={this.filterByDepartment}
                                type="teacher" I
                            /> : <TeacherInfo
                                teacherInfo={selectedTeacher}
                                onBack={this.onToggleBack}
                                onActive={this.onToggleActive}
                            />
                    }
                </Col>
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
        toggleActiveTeacher: (id, data) => { dispatch(updateActiveTeacher(id, data)) }
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
