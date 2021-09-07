import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Edit } from '@material-ui/icons';
import AddChaper from './AddChaper';
import Chapter from './Chaper';
import Chaper from './Chaper';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@material-ui/core';
// import axios from 'axios'

const AddCourse = (props: any) => {  
    const [courseName, setCourseName] = useState('');
    const [courseText, setCourseText] = useState('');
    const [courseStatus, setCourseStatus] = useState('1');
    const [todosState, setTodosState] = useState([{
        id: uuidv4(),
        title: 'Chương 1',
        link: 'https://www.youtube.com/embed/tf2VslhpWHI',
        content: `
        chó lập bị thông đít 
        chó lập bị thông đít chó lập bị 
        thông đít chó lập bị thông đít thông đít`,
        completed : false
    },
    {
        id: uuidv4(),
        title: 'Chương 2',
        link: 'https://www.youtube.com/embed/pVrXLT7FH2E',
        content: 'Đây là nội dung chương 2',
        completed : false
    }])


    const addTodoInputStype={
        flex: '10',
        padding :'5px',
        width: '300px'

    }

    const changeTitle = (event: any) => {
        setCourseName(event.target.value)        
    }
    const changeText = (event: any) => {
        setCourseText(event.target.value)        
    }
    const changeStatus = (event: any) => {
        setCourseStatus(event.target.value)        
    }
    const add = async (name: any) =>{
        name.preventDefault()
        
        if(courseName !== '')
        {
            // try {
            //     const res = await axios.post('https://jsonplaceholder.typicode.com/todos',
            //     {
            //         id : uuidv4(),
            //         course,         
            //     })                     
            // }catch(error)
            // {
            //     console.log(error.mesage)
            // }
            console.log({
                courseName,
                courseText,
                courseStatus              
            })
            setCourseName('')
            setCourseText('')
            setCourseStatus('1')
        }
        

        
    }

    const deleteTodo = (id:any) =>{
        const newTodos = todosState.filter(todo=>{
            return todo.id !== id
        })
        setTodosState(newTodos)
    }

    const markComplete = (id:any) =>{
        const newTodos = todosState.map((todo)=>{
            if (todo.id == id) todo.completed = !todo.completed
            return todo
        })

        setTodosState(newTodos)
    }
    const addTodo = (title :any, link: any, content:any) =>{
        const newTodos = [...todosState, {
            id : uuidv4(),
            title,
            link,
            content,
            completed : false
        }] //const newTodos = [{v1}, {v2}, {v3}, {id : 4,title,completed : false}]
        setTodosState(newTodos)
    }
    const left ={
        width: '70%',
        
    }
    const right ={
        width: '50%',       
    }
    const divStyle = {
        // margin: '40px',
        // border: '5px solid pink'
        width: '50%',
    };
    return(
        <div className="form-home">
        <form onSubmit={add} >
            <h1 style={{textAlign:'center'}}>Thêm Khóa Học</h1>
            <div style={{display: 'flex',}}>
            <div style={right}> 
                <h5>Tên: </h5>
                <input type='text' name='name' placeholder='Nhập tên khóa học' style={addTodoInputStype}
                value={courseName}
                onChange={changeTitle}></input>
                <pre></pre>
                <h5>Mô tả: </h5>
                <input type='text' name='text' placeholder='Nhập tả hóa học' style={addTodoInputStype}
                value={courseText}
                onChange={changeText}></input>
                <pre></pre>
                <label htmlFor="status">Chọn trạng thái: </label>
                <pre></pre>
                <select id='status' name="status" style={addTodoInputStype} value={courseStatus} onChange={changeStatus}>
                    <option value='1'>Public</option>
                    <option value='2'>Private</option>               
                </select>
            </div>
            <div style={left}>
                <AddChaper addTodoFunc={addTodo}/>
            </div>
            </div>
                                                        
            <pre></pre>
            <div>
                {todosState.map((todo, i)=>{
                return <Chaper 
                key= {todo.id} 
                todoProps={todo} 
                markCompleteFunc={markComplete}
                deleteTodoFunc={deleteTodo}
                />;
                })}
            </div>
        
        <input className="w-100 btn btn-lg btn-primary" type="submit" value="Thêm"/>
    </form>
    </div>
    )
}

export default AddCourse;
