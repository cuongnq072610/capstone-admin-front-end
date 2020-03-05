import React from 'react';
import { Layout, Button, Icon, Input } from 'antd';
import "./index.scss";
import history from '../../utils/history';
const { Header } = Layout;

const mockData = [{
  teacher: "LamPD",
  mail: "lampd@fe.edu.vn",
  departments: ['Communication Business', 'New Category', 'Communication'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 2.4,
  isActive: true,
},
{
  teacher: "MaiTT",
  mail: "maitt6@fe.edu.vn",
  departments: ['Communication'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 1,
  isActive: true,
},
{
  teacher: "MaiVTT",
  mail: "maitt@fe.edu.vn",
  departments: ['Computer Science'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 1,
  isActive: true,
},
{
  teacher: "PhuongLh7",
  mail: "phuonglh7@fe.edu.vn",
  departments: ['Communication'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 1,
  isActive: true,
},
]

/* eslint-disable react/prefer-stateless-function */
class SearchTeacher extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      chosenTeacher: []
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
  }
  handleInputEvent = (value) => {
    var newArr2 = mockData.filter(teacher => teacher.teacher)
  }
  filterList = (event) => {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function (item) {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({
      items: updatedList
    });
  };

  renderTeacher = (teacher, index) => {
    return (
      <div className='teacher-field' key={index}>
        <span>{index}</span>
        <p className='teacher-name'>{teacher.teacherName}</p>
      </div>
    )
  }

  render() {
    const { course, type } = this.props;
    return (
      <Layout className="wrap">
        <Header>Teachers</Header>
        <form className="wrap-content" onSubmit={this.handleSubmit}>
          <Input
            prefix={<Icon type="search" />} onSearch={value => this.handleInputEvent(value)}
            name='chosenTeacher'
            placeholder="Search for teachers"
            onChange={this.filterList}
          />
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
        </form>
      </Layout>
    )
  }
}

SearchTeacher.propTypes = {};

export default SearchTeacher;
