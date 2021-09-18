import PropTypes from 'prop-types'
import React,{useState,useEffect} from "react"

import CardCourse from './CardCourse'

import {
  Container,
  Row,
  Col,

} from "reactstrap"
import { Link } from "react-router-dom"


// import images




//i18n

const useStyle={
  formControl: {
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left',
      color: 'black'
  },
  fontColor: {
      color: 'black',
      textAlign: 'left',
  }
  
}



const Dashboard = props => {
  

  
  const [course1, setCourse] = useState([]);

  const loadCourses = async () => {               
    const link = 'https://lmsg03.azurewebsites.net/api/Course/getcourse'
    const response = await fetch(link,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    
    const content = await response.json();

    // const {}
    if (content.status === 200)
    {
      setCourse(content.data);
      loadCourses();
    }

    
    // if(course1 == '')
    // {
    //     setcategoryId(content.data[1].categoryId) 
    // }
    }
    useEffect(() => {
      loadCourses();
    }, []);




  const courseList = course1;

  const getcourseList =(courseObject) => {
    return (
      <Col sm={3}>
        <CardCourse {...courseObject} />
      </Col>
      );
  }

  const course = courseList.map(courseObject => getcourseList(courseObject));

  return (
    
    <React.Fragment>
      <div className="page-content">
        <Container fluid={false} style={useStyle.fontColor}>
          <h4 color="black" >Dashboard</h4>
          <Row>
            {course}
          </Row>
          
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any
}

export default Dashboard
