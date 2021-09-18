import React from 'react'
import {useEffect,useState} from "react"

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
  import SweetAlert from "react-bootstrap-sweetalert"

export default function CardQuestionProps(props) {
    const {questionText,questionId} =props


    const [confirm_alert, setconfirm_alert] = useState(false)
    const [success_dlg, setsuccess_dlg] = useState(false)
    const [dynamic_title, setdynamic_title] = useState("")
    const [dynamic_description, setdynamic_description] = useState("")
// const { id } = useParams();

const handDelete = async () =>{
     
    const response = await fetch('https://lmsg03.azurewebsites.net/api/Questions/delete/' + questionId,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',

    });
    const content = await response.json();
    if(content.status === 200)
    {
      setRedirect(true);
    }
    // courseId(null);
    // console.log(content.data.courseId);
    // alert(courseId);
  
  }


    return (
        <Col lg={4}>
                <Card className=" bg-secondary">
                  <CardBody>
                    <Row>
                      <Col sm={10}>
                      <div class="text-white ">
                      {questionText}
                      </div>
                      </Col>
                      <Col sm={2}>
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
                  
                  </CardBody>
                </Card>
        </Col>
    )
}
