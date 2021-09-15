import React from 'react'
import { useState } from 'react';

import {
    Button,InputGroup, Label,Input

} from 'reactstrap';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//Import Flatepicker



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



export default function AddQuestion(props) {
    const {quizId} =props
    const [open, setOpen] = useState(false);
    

    // const [courseId, setcourseId] = useState([]);
    const [questionText, setquestionText] = useState('');
    const [correct, setCorrect] = useState('');
    const [wrong1, setF1] = useState('');
    const [wrong2, setF2] = useState('');
    const [wrong3, setF3] = useState('');

    const [ques1, setQues1] = useState('');
    const [ques2, setQues2] = useState('');
    const [ques3, setQues3] = useState('');
    const [ques4, setQues4] = useState('');



    const add = async (e) =>{
        e.preventDefault()
        checkCorrect(ques1,ques2,ques3,ques4);
        console.log(correct)
        if(quizId !== null)
        {                    
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Questions/addquestion',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                quizId,
                questionText,
                correct,
                wrong1,
                wrong2,
                wrong3
                })
            });
            const content = await response.json();
            console.log(content)
            if(content.message === 'Inserted'){
                // alert(content.message)              
                // setquestionText('')
                // setT('')
                // setF1('')
                // setF2('')
                // setF3('')               
            }
        }                 
    }


    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleQuestionTextChange = (e) => {
        setquestionText(e.target.value);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleCorrectChange = (e) => {
        setCorrect(e.target.value);
      };
      const handleQues1TextChange = (e) => {
        setQues1(e.target.value);
      };
      const handleQues2TextChange = (e) => {
        setQues2(e.target.value);
      };

      const handleQues3TextChange = (e) => {
        setQues3(e.target.value);
      };
      const handleQues4TextChange = (e) => {
        setQues4(e.target.value);
      };
      
      const checkCorrect = (ques1 , ques2, ques3,ques4) =>{
            if(correct == ques1)
            {
                setF1(ques2)
                setF2(ques3)
                setF3(ques4)
            }
            else if(correct == ques2)
            {
                setF1(ques1)
                setF2(ques3)
                setF3(ques4)
            }
            else if(correct == ques3)
            {
                setF1(ques1)
                setF2(ques2)
                setF3(ques4)
            }
            else{
                setF1(ques1)
                setF2(ques2)
                setF3(ques3)
            }
      };


    return (
        <React.Fragment>
        <Button  color='info' onClick={()=>handleClickOpen()}><i className="fas fa-book"></i></Button>
        
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <form onSubmit={add} style={useStyles.form} >
            <DialogTitle id="alert-dialog-title">{"Thêm Câu Hỏi"}</DialogTitle>
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
                label="Câu hỏi"
                type="text"
                value={questionText}
                fullWidth
                onChange={handleQuestionTextChange}

                />
                </FormControl>
                <FormControl style={useStyles.formControl}>
                <Label className="form-label mb-3 d-flex">Tạo câu hỏi</Label>
                  <div className="form-check form-check-inline">
                    <Input
                      type="radio"
                      id="customRadioInline1"
                      name="customRadioInline1"
                      className="form-check-input"
                      value={ques1}
                      checked={correct === ques1}
                      onChange={handleCorrectChange}
                    />
                    <Label
                      className="form-check-label" htmlFor="customRadioInline1"
                    >

                      <Input
                        margin="dense"
                        id="name"
                        label="Ques1"
                        type="text"
                        value={ques1}
                        fullWidth
                        onChange={handleQues1TextChange}

                        />


                    </Label>
                  </div>
                  
                  <div className="form-check form-check-inline">
                    <Input
                      type="radio"
                      id="customRadioInline2"
                      name="customRadioInline1"
                      className="form-check-input"
                      value={ques2}
                      checked={correct === ques2}
                      onChange={handleCorrectChange}

                    />
                    <Label
                      className="form-check-label" htmlFor="customRadioInline2"
                    >

                      <Input
                        margin="dense"
                        id="name"
                        label="Ques2"
                        type="text"
                        value={ques2}
                        fullWidth
                        onChange={handleQues2TextChange}

                        />

                    </Label>
                    </div>

                    <div className="form-check form-check-inline">
                    <Input
                      type="radio"
                      id="customRadioInline1"
                      name="customRadioInline1"
                      className="form-check-input"
                      value={ques3}
                      checked={correct === ques3}
                      onChange={handleCorrectChange}
                    />
                    <Label
                      className="form-check-label" htmlFor="customRadioInline1"
                    >

                      <Input
                        margin="dense"
                        id="name"
                        label="Ques3"
                        type="text"
                        value={ques3}
                        fullWidth
                        onChange={handleQues3TextChange}

                        />


                    </Label>
                  </div>

                  <div className="form-check form-check-inline">
                    <Input
                      type="radio"
                      id="customRadioInline1"
                      name="customRadioInline1"
                      className="form-check-input"
                      value={ques4}
                      checked={correct === ques4}
                      onChange={handleCorrectChange}
                    />
                    <Label
                      className="form-check-label" htmlFor="customRadioInline1"
                    >

                      <Input
                        margin="dense"
                        id="name"
                        label="Ques3"
                        type="text"
                        value={ques4}
                        fullWidth
                        onChange={handleQues4TextChange}

                        />


                    </Label>
                  </div>


                    </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Đóng
              </Button>
              <Button type="submit" color="primary" autoFocus >
                Lưu
              </Button>

            </DialogActions>
            </form>
        </Dialog>
        
        </React.Fragment>
    )
}
