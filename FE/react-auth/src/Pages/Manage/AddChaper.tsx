import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

const AddChaper = (props: any) =>{
    const addTodo = props.addTodoFunc

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');

    const addTodoFromStype = {       
        width: '610px'
    }
    const addTodoInputStype={
        flex: '10',
        padding :'5px',
        width: '610px', 
    }
    const addTodoInputStype1={
        flex: '10',
        padding :'5px',
        width: '610px',
         
    }
    
    const changeTitle = (event:any) => {
        setTitle(event.target.value)
    }
    const changeLink = (event:any) => {
        setLink(event.target.value)
    }
    const changeContent = (event:any) => {
        setContent(event.target.value)
    }
    const addSingleTodo = (event:any) => {
        event.preventDefault()
        if(title !== '')
        {
            addTodo(title, link, content) 
            alert(title)
            setTitle('')
            setLink('')
            setContent('')
        }
    }
    return (
        <form style={addTodoFromStype}>
            <h5>Thêm chương học cho khóa học:</h5>
            <pre></pre>
            <input type='text' name='title' placeholder='Nhập tên chương' style={addTodoInputStype}
            value={title}
            onChange={changeTitle}></input>
            <pre></pre>
            <input type='text' name='title' placeholder='Nhập link video' style={addTodoInputStype}
            value={link}
            onChange={changeLink}></input>
            <pre></pre>
            <textarea name='title' placeholder='Nhập nội dung chương' style={addTodoInputStype1}
            value={content}
            onChange={changeContent}></textarea>
            <input type='file' name='file' style={addTodoInputStype}
            value={link}
            onChange={changeLink}></input>
            <pre></pre>
            <input type="submit" value="Thêm" onClick={addSingleTodo}/>
        </form>
    ) 
}

AddChaper.propTypes = {
    addTodoFunc: PropTypes.func.isRequired
}

export default AddChaper