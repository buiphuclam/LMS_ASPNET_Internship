import React from "react"
import MetaTags from 'react-meta-tags';
import {useState,useEffect} from "react"
import ListSection from './ListSection'
import ListCourse from './ListCourse'

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  CardSubtitle,
  Container,
  Collapse,
} from "reactstrap"

// Form Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

const DanhSachSection = () => {

  const [course1, setCourse] = useState([]);
  const [section1,setSection] = useState([])
  
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
        // <Col sm={3}>
        <CardBody>
          <ListCourse {...courseObject} />
            <ListSection  {...courseObject}/>
        </CardBody>
          
        // </Col>
        );
    }
  
    const course = courseList.map(courseObject => getcourseList(courseObject));
  
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Form Editors | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs maintitle="Veltrix" title="Form" breadcrumbItem="Danh Sách Lớp Học" />

          <Row>
            <Col>
              <Card>
                {course}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default DanhSachSection
