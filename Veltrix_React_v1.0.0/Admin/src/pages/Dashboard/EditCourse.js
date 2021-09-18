import React from 'react';
import {useState} from 'react';
import {useEffect} from "react";

import {
    Button,
} from 'reactstrap';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { ContentState, convertToRaw, EditorState } from 'draft-js';



const useStyles =  {
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
     
    },
    formControl: {
      marginTop: 20,
      width: '100%'
      
    },
  }

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function EditCourse(props) {

    const {coursename, courseshortdetail,coursedocument,categoryid,courseid  }= props;
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(categoryid);
    const [courseShortDetail1, setcourseShortDetail] = useState(EditorState.createWithContent(ContentState.createFromText(courseshortdetail)));
    const [courseDocument1, setCourseDocument] = useState(EditorState.createWithContent(ContentState.createFromText(coursedocument)));

    const [courseName, setCourseName] = useState(coursename);
    const [coourseImg, setCourseImg] = useState('null');
    // useEffect(() =>  {
    //     console.log({courseDocument});
    // },[]);
    // const abc =()=>{
    //     alert("submit");
    // }

    const onEditorStateChange1 = courseShortDetail1 => {
    setcourseShortDetail(courseShortDetail1);
	};

    const onEditorStateChange2 = courseDocument1 => {
    setCourseDocument(courseDocument1);
	};
    
    const validateForm = () => {
        var s = convertToRaw(courseShortDetail1.getCurrentContent());
        var s1 = convertToRaw(courseDocument1.getCurrentContent());
        return s.blocks[0].text.trim().length > 0 && s1.blocks[0].text.trim().length > 0;
      };

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
            // if(categoryId == '')
            // {
            //     setcategoryId(content.data[1].categoryId) 
            // }
            // if(categoryid == categoryId){
            //     setCategoryPosition(content.data[1].categoryId)
            // }
            
              
        }    
    )();
    },[]);

    const change = async (name) =>{
        name.preventDefault()
        
        const courseShortDetail = convertToRaw(courseShortDetail1.getCurrentContent()).blocks[0].text;
        const courseDocument = convertToRaw(courseDocument1.getCurrentContent()).blocks[0].text;
        // console.log(courseName);
        // console.log(categoryId);
        setCourseImg(null);
        if(courseName !== '')
        {                       
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Course/editcourse?courseId='+ courseid,{
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
            // if(content.message === 'Success!')
            // {  
            //     setCourseName('')
            //     setcourseShortDetail(EditorState.createEmpty())
            //     setcourseDocument(EditorState.createEmpty())                 
            // }
           
        }
      }

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleCatChange = (event) => {
        setCategoryId(event.target.value);
      };
    const handleCourseChange = (event) => {
        setCourseName(event.target.value)
    }

    return (
        <React.Fragment>
        <Button  color='info' onClick={()=>handleClickOpen()}><i className="mdi mdi-pen"></i></Button>
        
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <form onSubmit={change} style={useStyles.form} >
            <DialogTitle id="alert-dialog-title">{"Edit Course"}</DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText> */}
              
              <FormControl style={useStyles.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Tên Khóa Học"
                type="text"
                value={courseName}
                fullWidth
                onChange={handleCourseChange}

                />
                </FormControl>
                
                <FormControl style={useStyles.formControl}>
                <InputLabel  >Category</InputLabel>
                <Select
                value={categoryId}
                onChange={handleCatChange}
                margin="dense"
                fullWidth
                >
                    {category.map((todo, i)=>{
                        return <MenuItem value={todo.categoryId}>{todo.categoryName}</MenuItem>;
                    })} 
                    {/* <MenuItem value={false}>false</MenuItem>
                    <MenuItem value="xs">xs</MenuItem>
                    <MenuItem value="sm">sm</MenuItem>
                    <MenuItem value="md">md</MenuItem>
                    <MenuItem value="lg">lg</MenuItem>
                    <MenuItem value="xl">xl</MenuItem> */}
                </Select>
                </FormControl>
                    
                <InputLabel style={{marginTop:'20px'}}>Mô tả ngắn gọn</InputLabel>
                <Editor
                    defaultEditorState={courseShortDetail1}
                    editorState={courseShortDetail1}
                    editorStyle={{height: '100px'}}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange1}
                          
                />

                <InputLabel  style={{marginTop:'20px'}}>Mô tả chi tiết</InputLabel>
                <Editor
                    defaultEditorState={courseDocument1}
                    editorState={courseDocument1}
                    editorStyle={{height: '100px'}}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange2}
                          
                />
                
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Đóng
              </Button>
              <Button type="submit" color="primary" autoFocus disabled={!validateForm() }>
                Lưu
              </Button>

            </DialogActions>
            </form>
        </Dialog>
        
        </React.Fragment>
    )
}
