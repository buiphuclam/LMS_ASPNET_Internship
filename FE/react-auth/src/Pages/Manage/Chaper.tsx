import React, { Fragment } from 'react';
import PropTypes from 'prop-types'

const Chaper = (chaperProp:any) =>{
    const todo = chaperProp.todoProps
    const markComplete = chaperProp.markCompleteFunc
    const deleteTodo = chaperProp.deleteTodoFunc

    //style
    const todoStyle = {       
        background : '#f4f4f4',
        padding : '10px',
        borderBottom: '1px #ccc dotted',
        textDecoration : todo.completed ? 'line-through' : 'none',
    }

    const textStyle = {
        
    }
    //return
    return (
        <div>
            <p style = {todoStyle}>
                <input 
                type ='checkbox' 
                onChange = {markComplete.bind(this, todo.id)} 
                checked={todo.completed}></input>
                {todo.title}
                <button onClick={deleteTodo.bind(this, todo.id)}>Delete</button>                   
            </p>
            <div style={{display: 'flex',}}>
            <iframe style={{width: '50%',}} width="600" height="345" src={todo.link}></iframe>
            <div style={{width: '50%',paddingLeft:'10px'}}>
                <h6>Nội dung chương:</h6>
                <pre>{todo.content}</pre>
                </div>   
            </div>
              
              
    </div>
        
    )
}

//proptypes
Chaper.proTypes ={
    todoProps : PropTypes.object.isRequired,
    markCompleteFunc: PropTypes.func.isRequired,
    deleteTodoFunc: PropTypes.func.isRequired
}



export default Chaper