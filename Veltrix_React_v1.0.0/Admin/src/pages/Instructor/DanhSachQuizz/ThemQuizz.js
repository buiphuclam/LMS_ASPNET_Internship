import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import CardQuizz from './CardQuizz'

import AddQuiz from "./AddQuizz"
import {useEffect} from "react"

import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Button,
} from "reactstrap"


// Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import { Link } from "react-router-dom"

const ThemQuizz = (props) => {
  
  const [listQuizz, setlistQuizz] = useState([])

 

    useEffect(() =>  {
      (
        async () => {          
            const link = 'https://lmsg03.azurewebsites.net/api/Quizs/getallquizs'
            const response = await fetch(link,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
            
            const content = await response.json();
            setlistQuizz(content.data)
            console.log(content.data)
            // setquizId(content.data[0].quizId)                             
        }    
      )();
    },[]);
    
    
  
    const getListQuizz =(value) => {
      return (
        // <Col sm={3}>
        <>
        
          {/* <h2 className="accordion-header" id="headingOne"> */}
            
            <CardQuizz {...value} />
            
          {/* </h2> */}


         
          

        {/* <CardQuestion {...value}/> */}
          
          
        </>
        // </Col>
        );
    }
    

    const Quiz = listQuizz.map(value => getListQuizz(value))

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Form File Upload | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs maintitle="Veltrix" title="Form" breadcrumbItem="Form File Upload" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Danh Sách Quizz</CardTitle>
                  
                  <div className="card-title-desc">
                    <AddQuiz />
                    
                  </div>
                  <div className="mb-5">
                    <Form>
                      {Quiz}
                    </Form>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Send Files
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ThemQuizz
