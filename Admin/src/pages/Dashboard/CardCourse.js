import React from 'react'
import Dialog from './EditCourse'
import {useState} from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,
} from 'reactstrap';
import SweetAlert from "react-bootstrap-sweetalert"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";

import course from "../../assets/images/product/img-0.jpg";
import { maxHeight } from '@material-ui/system';
const useStyle ={
  cardControl : {
    width: '18rem',
    height: '25rem'
  }
}


export default function CardCourse(props) {
const {courseName, courseShortDetail,courseDocument, courseId, categoryId  } = props;
const { url } = useRouteMatch();

const [confirm_alert, setconfirm_alert] = useState(false)
  const [success_dlg, setsuccess_dlg] = useState(false)
  const [dynamic_title, setdynamic_title] = useState("")
  const [dynamic_description, setdynamic_description] = useState("")
// const { id } = useParams();


const handDelete = async () =>{
     
  const response = await fetch('https://lmsg03.azurewebsites.net/api/Course/deletecourse',{
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  credentials: 'include',
  body: JSON.stringify(
      courseId
      )
  
  });
  const content = await response.json();
  // courseId(null);
  // console.log(content.data.courseId);
  // alert(courseId);

}



    return (
        <>
        <Card style={useStyle.cardControl}>
          <CardImg src={course} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h5">{courseName}</CardTitle>
            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
            <CardText>{courseShortDetail}</CardText>
            <Row key={courseId}>
                <div className="col-2" >
                <Dialog coursename={courseName} courseshortdetail={courseShortDetail} coursedocument={courseDocument} categoryid={categoryId} courseid={courseId}></Dialog>
                </div>
                <div className='col-2'>
                <Button color='danger' onClick={() => {
                    setconfirm_alert(true)
                    
                    }}
                    id="sa-success" 
                    
                  >
                    <i className="typcn typcn-delete"></i>
                </Button>
                {/* <button ></button> */}
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
                      location.reload();
                    }}
                  >
                    {dynamic_description}
                  </SweetAlert>
                  ) : null}

                </div>
            </Row>
          </CardBody>
          
        </Card>
        <Switch>
        <Route path={`${url}/:courseId`}>
          <></>
        </Route>
      </Switch>
        </>
    )
}
