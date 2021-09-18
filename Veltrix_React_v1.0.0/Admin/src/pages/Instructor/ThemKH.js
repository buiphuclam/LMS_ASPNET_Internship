import React, { useState } from "react"
import {useEffect} from "react";

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Input,
  FormGroup,
  Button
} from "reactstrap"

// Form Editor
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import { AvForm, AvField } from "availity-reactstrap-validation"


const ThemKH = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [courseName, setCourseName] = useState('');
  const [courseShortDetail1, setcourseShortDetail] = useState(EditorState.createEmpty());
  const [categoryId, setcategoryId] = useState('');
  const [courseDocument1, setcourseDocument] = useState(EditorState.createEmpty());
  const [coourseImg, setCourseImg] = useState('');


  const onEditorStateChange1 = courseShortDetail1 => {
    setcourseShortDetail(courseShortDetail1);
	};

  const onEditorStateChange2 = courseDocument1 => {
    setcourseDocument(courseDocument1);
	};

  const validateForm = () => {
    var s = convertToRaw(courseShortDetail1.getCurrentContent());
    var s1 = convertToRaw(courseDocument1.getCurrentContent());
    return s.blocks[0].text.trim().length > 0 && s1.blocks[0].text.trim().length > 0;
  };


  const add = async (name) =>{
    name.preventDefault()
    
    const courseShortDetail = convertToRaw(courseShortDetail1.getCurrentContent()).blocks[0].text;
    const courseDocument = convertToRaw(courseDocument1.getCurrentContent()).blocks[0].text;
    setCourseImg(null);
    if(courseName !== '')
    {                       
        const response = await fetch('https://lmsg03.azurewebsites.net/api/Course/addcourse',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            courseName,
            courseShortDetail,
            categoryId,
            courseDocument,
            coourseImg,
            })
        });
        const content = await response.json();
        
        console.log(content.data);
        if(content.message === 'Success!')
        {  
            setCourseName('')
            setcourseShortDetail(EditorState.createEmpty())
            setcourseDocument(EditorState.createEmpty())                 
        }
       
    }
  }
  const [category, setCategory] = useState([]);
  useEffect(() =>  {
      (
          async () => {               
              const link = 'https://lmsg03.azurewebsites.net/api/Category/getcategory'
              const response = await fetch(link,{
                  method: 'GET',
                  headers: {'Content-Type': 'application/json'},
                  credentials: 'include'
              });
              
              const content = await response.json();
              setCategory(content.data)
              console.log(content.data)
              if(categoryId == '')
              {
                  setcategoryId(content.data[1].categoryId) 
              }
                
      }    
      )();
      },[]);


  return (
    <React.Fragment>
      <div className="page-content">
        <AvForm onSubmit={add} className="needs-validation">
        <Container fluid={true}>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row className="mb-3">

                      <label 
                      htmlFor="example-text-input"
                        className="col-md-2 col-form-label">
                      First name
                      </label>
                      <div className="col-md-10">
                        <AvField
                          className="form-control"
                          type="text"
                          // defaultValue="Nhập tên khóa học"
                          value={courseName}
                          name='name'
                          validate={{ required: { value: true } }}
                          errorMessage="Vui lòng nhập tên khóa học"
                          placeholder="Nhập tên khóa học"
                          onChange={(e)=>setCourseName(e.target.value)}
                        />
                     </div>
                     
                  </Row>

                  <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Category
                    </label>
                    <div className="col-md-10">
                      <FormGroup>
                          <Input type="select" name="select" id="status"  name="status" value={categoryId} onChange={(e)=>setcategoryId(e.target.value)}>
                            {category.map((todo, i)=>{
                            return <option value={todo.categoryId}>{todo.categoryShortDetail}</option>;
                            })} 
                          </Input>
                      </FormGroup>
                    </div>
                  
                  </Row>

                  <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Course Short Detail
                    </label>
                    <div className="col-md-10">
                        <Editor
                          editorState={courseShortDetail1}
                          editorStyle={{color: 'black'}}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorStateChange1}
                          
                        />
                        
                    </div>
                  
                  </Row>
                  <Row className="mb-3">
                    <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Course Document
                    </label>
                    <div className="col-md-10">
                        <Editor
                          editorState={courseDocument1}
                          editorStyle={{color: 'black'}}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorStateChange2}
                          
                        />
                    </div>
                  </Row>
                           
                </CardBody>
                <Button 
                color="primary" 
                size="lg" 
                block tyle='submit' 
                disabled={!validateForm() }
                >Thêm</Button>
              </Card>
            </Col>
          </Row>
        </Container>
        </AvForm>
      </div>
    </React.Fragment>
  )
}

export default ThemKH
