import React from 'react';
import { Layout, Button, Icon, Input } from 'antd';
import "./index.scss";
import history from '../../utils/history';
const { Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
class SearchTeacher extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      chosenTeacher: []
    }
  }

  renderTeacher = (teacher, index) => {
    return (
      <div className='teacher-field' key={index}>
        <img src={teacher.avatar} style={{ width: '30px', height: '30px' }} />
        <p className='teacher-name'>{teacher.name}</p>
      </div>
    )
  }

  render() {
    const { course, type } = this.props;
    return (
      <Layout className="wrap">
        <Header>Teachers</Header>
        <div className='wrap-content'>
          <h3 className="chosen-teacher">{course.teachers.length} CHOSEN TUTORS</h3>
          <div>
            {
              course.teachers.map((teacher, index) => this.renderTeacher(teacher, index))
            }
          </div>
          <Button
            className="add-btn"
            icon="plus"
            onClick={() => history.push({
              pathname: "/course/addteacher",
              state: {
                course: course,
                type: type,
              }
            })}
          >
            Add teacher
             </Button>
        </div>
      </Layout>
    )
  }
}

SearchTeacher.propTypes = {};

export default SearchTeacher;
