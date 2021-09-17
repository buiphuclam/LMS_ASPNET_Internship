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

const useStyle={
  formControl: {
      display:'flex',
      flexDirection: 'collum',
      justifyContent: 'space-between',
      
      color: 'black'
  },
  fontColor: {
      color: 'black',
      textAlign: 'left',
  }
  
}


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
            
            <CardQuizz {...value} />
      
        
        );
    }
    

    const Quiz = listQuizz.map(value => getListQuizz(value))

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody style={useStyle.fontColor}>
                  <CardTitle className="h4 text-black" >Danh Sách Quizz</CardTitle>
                  
                  <div className="card-title-desc">
                    <AddQuiz />
                    
                  </div>
                  <div className="mb-5">
                    <Form>
                      {Quiz}
                    </Form>
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
