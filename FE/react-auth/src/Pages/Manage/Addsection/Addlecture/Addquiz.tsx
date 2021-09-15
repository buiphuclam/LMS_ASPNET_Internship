import { Console } from 'console';
import React, { useEffect, useState } from 'react';

const Addquiz = (props: any) => { 
    const [quizName, setquizName] = useState('');
    const [quizTime, setquizTime] = useState(0);
 
    const addTodoInputStype={
        flex: '10',
        padding :'5px',
        width: '300px'

    }

    const add = async (e:any) =>{
        e.preventDefault()
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
            if(content.message === 'Success!'){
                alert(content.message)                              
                //setTeacherId(listTeacher[1].id)
            }
        }                 
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
    } 
    const [listQuiz, setlistQuiz] = useState([])
    useEffect(() =>  {
        (
            async () => {          
                const link = 'https://lmsg03.azurewebsites.net/api/Quizs/getallquizs'
                const response = await fetch(link,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                
                const content = await response.json();
                setlistQuiz(content.data)                            
        }    
        )();
        });
    const deletequiz=(id:any)=>{

    }
    return(   
        <form onSubmit={add} >
            <h1 style={{textAlign:'center'}}>Thêm câu hỏi</h1>
            <div style={{display: 'flex',}}>
            <div style={right}>
                <h5>Tên câu hỏi</h5>
                <input type='text' name='lectureName' placeholder='Tên câu hỏi' style={addTodoInputStype}
                value={quizName}
                onChange={(e)=>setquizName(e.target.value)}></input>
                <pre></pre>
                <h5>Thời gian làm bài</h5>
                <input type='number' name='lectureDetail' placeholder='Thời gian làm bài' style={addTodoInputStype}
                value={quizTime}
                onChange={(e)=>setquizTime(e.target.valueAsNumber)}></input>
                <pre></pre>                             
            </div>
            </div>
            <input className="w-100 btn btn-lg btn-primary" type="submit" value="Thêm"/>                                      
            <pre></pre>
           <h5>Danh sách quiz:</h5>
            <div>
                {listQuiz.map((todo:any, i)=>{
                return (<div>
                    <p>{todo.quizName}</p>
                    <button onClick={()=>{deletequiz(todo.quizId)}}>Xóa quiz</button>
                </div>)})}
            </div>       
        
    </form>
    )
}

export default Addquiz;
