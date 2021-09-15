import React from 'react'
import { useState } from 'react';

import {
    Button,InputGroup, Label,FormGroup,
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



export default function AddStudent(props) {
    const {sectionId, listStudent} = props
    const [open, setOpen] = useState(false);

    const [id, setUserId] = useState('')




    const add = async (name) =>{
        name.preventDefault()

        
        const userId= id;
        console.log(userId)
        if(userId !== '')
        {                       
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Enroll/enroll',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                userId,
                sectionId
                })
            });
            const content = await response.json();
            
            // console.log(content.data);
            // if(content.message === 'Success!')
            // {  
                 
            // }
           
        }
      }


    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
      setOpen(false);
    };
      const handleStudentChange = (e) => {
        setUserId(e.target.value);
      };
      
    return (
        <React.Fragment>
        <Button  color='info' onClick={()=>handleClickOpen()}><i className="fas fa-user-graduate"></i></Button>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <form onSubmit={add} style={useStyles.form} >
            <DialogTitle id="alert-dialog-title">{"Thêm học sinh vào lớp"}</DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText> */}
              
              
              <FormControl style={useStyles.formControl}>

                    <FormGroup >
                                         
                    {/* <Label>Chọn học sinh thêm vào lớp</Label> */}
                     <Select
                     value={id}
                     onChange={handleStudentChange}
                     margin="dense"
                     fullWidth
                                    
                     >
                         {listStudent.map((todo, i)=>{
                         return <MenuItem value={todo.id}>{todo.email}</MenuItem>;
                         })}
                    </Select>
                    </FormGroup>
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
