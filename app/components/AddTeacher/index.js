import React from 'react';
import { Layout, Button, Icon, Input } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;
const { Search } = Input;

const chosenTeacher = "";

/* eslint-disable react/prefer-stateless-function */
class AddTeacher extends React.Component {
  render() {
    const { onFilter, categories } = this.props;
    return (
      <Layout className="wrap">
        <Header style={{ backgroundColor: '#fff', color: '#9C4AEE' }}>Teachers</Header>
        <Search
          placeholder="Search for teachers"
          onSearch={value => console.log(value)}
        />
        <Content>
          <h3 style={{ backgroundColor: '#fff', color: '#707070', marginTop: '40px' }}>CHOSEN TUTORS</h3>
          <Button style={{ backgroundColor: '#fff', color: '#9C4AEE', marginTop: '30px' }} className="btn" icon="plus" size="medium" >Add teacher
          
          </Button>
        </Content>
      </Layout>
    )
  }
}

AddTeacher.propTypes = {};

export default AddTeacher;
