import React from 'react';
const Teacher = props => {
  const { teacher } = props;
  return (
    <div className="teacherWrapper">
        <div className="teacher flex" key={Math.random() * 10} >
            <img src={require(`../../assets/image/avatar (1).png`)}/>
            <div className="info">
                <h3>{teacher[0].name}</h3>
                <p>{teacher[0].email}</p>
            </div>
        </div>

        <div className="teacher flex" key={Math.random() * 10}>
            <img src={require(`../../assets/image/avatar (2).png`)}/>
            <div className="info">
                <h3>{teacher[1].name}</h3>
                <p>{teacher[1].email}</p>
            </div>
        </div>

        <div className="teacher flex" key={Math.random() * 10}>
            <img src={require(`../../assets/image/avatar (3).png`)}/>
            <div className="info">
                <h3>{teacher[2].name}</h3>
                <p>{teacher[2].email}</p>
            </div>
        </div>
    </div>
  );
};

export default Teacher;
