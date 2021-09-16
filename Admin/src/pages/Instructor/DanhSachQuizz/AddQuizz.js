import React from 'react'
import { useState } from 'react';
import { Redirect } from "react-router-dom";

import {
    Button,InputGroup, Label
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



export default function AddQuizz() {
    const [open, setOpen] = useState(false);
    const [quizName, setQuizName] = useState('')
    const [quizTime, setQuizTime] = useState(0)
    const [redirect, setRedirect] = useState(false)


    const add = async (name) =>{
        name.preventDefault()

        console.log(quizTime)
        
        if(quizName !== '')
        {                       
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Quizs/addquiz',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                quizName,
                quizTime
                })
            });
            const content = await response.json();
            
            console.log(content.data);
            if(content.status === 200)
            {  
              alert("Thêm quiz thành công !");
              setRedirect(true);
            }
           
        }
      }


    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleQuizNameChange = (e) => {
        setQuizName(e.target.value);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleQuizTimeChange = (e) => {
        setQuizTime(e.target.value);
      };

    if(redirect)
      return <Redirect to="/ThemQuizz?"/>;

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
            <DialogTitle id="alert-dialog-title">{"Thêm Quizz"}</DialogTitle>
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
                label="Tên Quizz"
                type="text"
                value={quizName}
                fullWidth
                onChange={handleQuizNameChange}

                />
                </FormControl>
              <FormControl style={useStyles.formControl}>
                <TextField
                    margin="dense"
                    label="Time"
                    type="number"
                    value={quizTime}
                    fullWidth
                    onChange={handleQuizTimeChange}

                      />
                </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Đóng
              </Button>
              <Button type="submit" color="primary" autoFocus onClick={handleClose} >
                Lưu
              </Button>

            </DialogActions>
            </form>
        </Dialog>
        
        </React.Fragment>
    )
}
