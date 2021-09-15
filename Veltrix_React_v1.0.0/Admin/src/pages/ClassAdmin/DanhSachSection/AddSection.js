import React from 'react'
import {useState,useEffect} from "react"

import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Container,
    Label,
    InputGroup,
    FormGroup,
    Input,
  } from "reactstrap"

  import Select from '@material-ui/core/Select';
  import MenuItem from '@material-ui/core/MenuItem';
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

export default function AddSection(props) {
    const {courseName,courseid}= props;
    const [modal, setmodal] = useState(false)
    const [listTeacher, setListTeacher] = useState([])
    const ternDataSelec = [{id:1, term: 1},{ id:2, term: 2},{id:3, term: 3}]

    const [id, setTeacherId] = useState('');
    const [year, setYear] = useState('2021');
    const [term, setTerm] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [document, setDocument] = useState('');
    
    

    const handleTermChange = (event) => {
        setTerm(event.target.value);
      };
      const handleTeacherChange = (event) => {
        setTeacherId(event.target.value);
      };
      const handleStartYChange = (event) => {
        setStartDate(event.target.value);
      };
      const handleEndYChange = (event) => {
        setEndDate(event.target.value);
      };

      const add = async (e) =>{
        e.preventDefault()
        const courseId = courseid;
        const teacherId= id;
        
        console.log(courseId)
        console.log(id)
        console.log(year)
        console.log(term)
        console.log(startDate)
        console.log(endDate)
        console.log(document)
        if(courseId !== '')
        {                    
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Course/addsection',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                courseId,
                teacherId,
                year,
                term,
                startDate,
                endDate,
                document,
                })
            });
            const content = await response.json();
        }                 
    }
    useEffect(() =>  {
      (
          async () => {               
              const link = 'https://lmsg03.azurewebsites.net/api/User/getteacher'
              const response = await fetch(link,{
                  method: 'GET',
                  headers: {'Content-Type': 'application/json'},
                  credentials: 'include'
              });
              
              const content = await response.json();
              console.log(content.data)
              setListTeacher(content.data)
              // if(teacherId == '')
              // {
              //     setTeacherId(content.data[1].id) 
              // }                 
      }    
      )();
      },[]);

    return (
        <>

              <div>
                <Button
                    color="primary"
                    onClick={() => {
                    setmodal(!modal)
                  }}
                  className="popup-form btn btn-primary"
                >
                  Thêm Lớp
                </Button>
              </div>
              
              <Modal
                size="lg"
                isOpen={modal}
                toggle={() => {
                  setmodal(!modal)
                }}
              >
                <form onSubmit={add}>
                <ModalHeader
                  toggle={() => {
                    setmodal(!modal)
                  }}
                >
                  Thêm Lớp Cho Khóa Học "{courseName}"
                </ModalHeader>
                <ModalBody>
                  
                    <Row>
                        
                      <Col lg={6}>
                      <div className="mb-3">
                      <FormGroup >
            
                            <Label>Chọn Teacher</Label>
                             <Select
                             value={id}
                             onChange={handleTeacherChange}
                             margin="dense"
                             fullWidth

                             >
                                 {listTeacher.map((todo, i)=>{
                                 return <MenuItem value={todo.id}>{todo.userName}</MenuItem>;
                                 })}
                             </Select>
                        </FormGroup>
                        </div>
                      </Col>
                      <Col lg={6}>
                      <div className="mb-3">
                      <FormGroup >


                        <Label>Học kì</Label>
                         <Select
                         value={term}
                         onChange={handleTermChange}
                         margin="dense"
                         fullWidth

                         >
                             {ternDataSelec.map((todo, i)=>{
                             return <MenuItem value={todo.id}>{todo.term}</MenuItem>;
                             })}
                        </Select>
                        </FormGroup>
                        </div>
                      </Col>
                     </Row>
                     <Row > 
                      <Col lg={6}>
                        <div className="mb-3">
                            <Label>Ngày bắt đầu</Label>
                            <Input
                            type='date' 
                            name='text' 
                            placeholder='startDate' 
                            value={startDate}
                            onChange={(e)=>setStartDate(e.target.value)}>
                              </Input>      
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                            <Label>Ngày kết thúc</Label>
                            <Input
                            type='date' 
                            name='text' 
                            placeholder='endDate' 
                            value={endDate}
                            onChange={(e)=>setEndDate(e.target.value)}>
                            </Input>   
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <label htmlFor="subject">Mô Tả</label>
                          <textarea
                            className="form-control"
                            id="subject"
                            rows="3"
                            value={document}
                            onChange={(e)=>setDocument(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="text-right">
                          <button type="submit" className="btn btn-primary">
                            Thêm
                          </button>
                        </div>
                      </Col>
                    </Row>
                  
                </ModalBody>
                </form>
              </Modal>
              
        </>
    )
}
