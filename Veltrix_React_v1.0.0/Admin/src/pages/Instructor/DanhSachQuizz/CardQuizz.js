import React from 'react'

import {useEffect,useState} from "react"
import { Collapse} from "reactstrap"
import AddQuestion from "./AddQuestion"

import {
    Row,
    Col,
    Card,
    Form,
    CardBody,
    CardTitle,
    CardSubtitle,
    Container,
    Button
    
  } from "reactstrap"

//   import Button from '@material-ui/core/Button';
//   import IconButton from '@material-ui/core/IconButton';
//   import DeleteIcon from '@material-ui/icons/Delete';

import SweetAlert from "react-bootstrap-sweetalert"
import CardQuestion from './CardQuestion';
  

export default function CardQuizz(props) {
    const {quizName,quizTime,quizId } = props
    const [listQuess, setlistQuess] = useState([])
    const [col1, setCol1] = useState(false);

const [confirm_alert, setconfirm_alert] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
// const { id } = useParams();

const handDelete = async () =>{
     
    const response = await fetch('https://lmsg03.azurewebsites.net/api/Quizs/deletequiz/' + quizId,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',

    });
    const content = await response.json();
    if(content.status === 200)
    {
      setRedirect(true);
      loadCardQuiz();
    }
    // courseId(null);
    // console.log(content.data.courseId);
    // alert(courseId);
  
  }


    const t_col1 = () => {
        setCol1(!col1)
      }
  
    const loadCardQuiz = async () => {          
      const link = 'https://lmsg03.azurewebsites.net/api/Questions/getquestionbyQuizId/' + quizId
      const response = await fetch(link,{
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
      });
      
      const content = await response.json();
      if(content.data !== null)
      {
        loadCardQuiz();
        setlistQuess(content.data)
        console.log(content.data)
      }

      // setquizId(content.data[0].quizId)                             
      }    
  
    useEffect(() => {
      loadCardQuiz();
    }, []);
        


    return (
        <>
        {/* <Link to={`${match.url}/` + quizId }> */}
        
        <Card className="text-white bg-success">
            <CardBody>
                <Row>
                    <Col sm="10">
                        <blockquote className="card-blockquote mb-0" >
                        <p>
                            {quizName}
                        </p>
                        </blockquote>
                        <footer className="blockquote-footer text-white font-12 m-0">
                            Thời gian: {" "}

                            <cite title="Source Title">{quizTime}</cite>
                        </footer>
                        <footer className="blockquote-footer text-white font-12 m-0">
                            Số câu hỏi: {" "}

                            <cite title="Source Title">{listQuess.length}</cite>
                        </footer>
                        <Button className=" fw-medium " color="primary" onClick={()=>t_col1()}>
                        Show More
                        </Button>
                    </Col>
                    <Col sm="2">
                        <Row>
                            <Col sm="4">
                                <AddQuestion quizId={quizId}/>
                            </Col>
                            <Col sm="4">
                                <Button  color='info' ><i className="mdi mdi-pen"></i></Button>
                            </Col>
                            <Col sm="4">
                       
                                <Button color='danger' onClick={() => {
                                    setconfirm_alert(true)
                                    }}
                                    id="sa-success" 
                                >
                                <i className="fas fa-trash"></i>
                                </Button>
                                    {confirm_alert ? (
                                    <SweetAlert
                                      title="Are you sure?"
                                      warning
                                      showCancel
                                      confirmButtonText="Yes, delete it!"
                                      confirmBtnBsStyle="success"
                                      cancelBtnBsStyle="danger"
                                      onConfirm={() => {
                                        setconfirm_alert(false)
                                        setsuccess_dlg(true)
                                        setdynamic_title("Deleted")
                                        setdynamic_description("Your course has been deleted.")
                                        handDelete()
                                      }}
                                      onCancel={() => setconfirm_alert(false)}
                                    >
                                      You won't be able to revert this!
                                       </SweetAlert>
                                     ) : null}
                                     {success_dlg ? (
                                     <SweetAlert
                                       success
                                       title={dynamic_title}
                                       onConfirm={() => {
                                         setsuccess_dlg(false)
                                       }}
                                     >
                                       {dynamic_description}
                                     </SweetAlert>
                                     ) : null}
                               </Col>
                           </Row>
                       </Col>
                     </Row>
                      
                

            </CardBody>
        </Card>
        <Collapse isOpen={col1} className="accordion-collapse">
            <div className="accordion-body">
              <div className="text-muted">
              <Row>
              <CardQuestion quizId={quizId} />
              </Row>
              </div>
            </div>
        </Collapse>
        </>
    )
}
