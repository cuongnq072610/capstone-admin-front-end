import React from 'react';
import { Layout, Button, Icon, Input } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;
const { Search } = Input;

/* eslint-disable react/prefer-stateless-function */
class AddTeacher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenTeacher: []
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.chosenTeacher)
  }
  handleInputEvent = (value) => {
    this.setState({
      chosenTeacher: [...this.state.chosenTeacher, value]
    })
  }

  deleteTeacher=(e) =>{
    const newArr = this.state.chosenTeacher.filter(teacher => teacher!==e)
    this.setState({
      chosenTeacher:newArr
    })
  }
  render() {
    const { chosenTeacher } = this.state;
    console.log(chosenTeacher)
    return (
      <Layout className="wrap">
        <Header>Teachers</Header>
        <form className="wrap-content" onSubmit={this.handleSubmit}>
          <Search
            onSearch={value => this.handleInputEvent(value)}
            name='chosenTeacher'
            placeholder="Search for teachers"
          />
          <h3 className="chosen-teacher">{this.state.chosenTeacher.length} CHOSEN TUTORS</h3>
          <Button className="add-btn" icon="plus" size="medium" htmlType="submit">Add teacher</Button>
        </form>
        {chosenTeacher.map((teacher, index) =>
            <div className="teacher-added" key={index}>
              <div className="teacher-info">
                <p className="teacher-name">{teacher}</p>
                <p className="teacher-email">anhyeuem@fpt.edu.vn</p>
              </div>
              <span className="icon-delete" onClick={()=>this.deleteTeacher(teacher)}></span>
            </div>)}
      </Layout>
    )
  }
}

AddTeacher.propTypes = {};

export default AddTeacher;
