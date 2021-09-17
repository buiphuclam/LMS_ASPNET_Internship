import PropTypes from 'prop-types'
import React,{useState,useEffect} from "react"
import MetaTags from 'react-meta-tags';
import Breadcrumbs from "../../components/Common/Breadcrumb"
import CardCourse from './CardCourse'

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap"
import { Link } from "react-router-dom"


// Custom Scrollbar
import SimpleBar from "simplebar-react";

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import smimg1 from "../../assets/images/small/img-1.jpg";
import smimg2 from "../../assets/images/small/img-2.jpg";


// Charts
import LineAreaChart from "../AllCharts/apex/lineareachart";
import RadialChart from "../AllCharts/apex/apexdonut";
import Apexdonut from "../AllCharts/apex/apexdonut1";
import SparkLine from "../AllCharts/sparkline/sparkline";
import SparkLine1 from "../AllCharts/sparkline/sparkline1";
import Salesdonut from "../AllCharts/apex/salesdonut";

// import "chartist/dist/scss/chartist.scss";

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

  useEffect(() =>  {
      (
          async () => {               
              const link = 'https://lmsg03.azurewebsites.net/api/Course/getcourse'
              const response = await fetch(link,{
                  method: 'GET',
                  headers: {'Content-Type': 'application/json'},
                  credentials: 'include'
              });
              
              const content = await response.json();

              // const {}
              console.log(content.data);
              setCourse(content.data);
              
              // if(course1 == '')
              // {
              //     setcategoryId(content.data[1].categoryId) 
              // }
                
      }    
      )();
      },[])



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
      <MetaTags>
          <title>Form Editors | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
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
