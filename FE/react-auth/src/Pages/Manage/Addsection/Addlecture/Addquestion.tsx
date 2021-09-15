import React, { useEffect, useState } from 'react';

const Addsection = (props: any) => { 
    const [courseId, setcourseId] = useState('');
    const [quizId, setquizId] = useState('');
    const [questionText, setquestionText] = useState('');
    const [correct, setT] = useState('');
    const [wrong1, setF1] = useState('');
    const [wrong2, setF2] = useState('');
    const [wrong3, setF3] = useState('');
    
    
    const addTodoInputStype={
        flex: '10',
        padding :'5px',
        width: '300px'

    }

    const add = async (e:any) =>{
        e.preventDefault()
        if(courseId !== null)
        {                    
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Questions/addquestion',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                courseId,
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
                alert(content.message)              
                setquestionText('')
                setT('')
                setF1('')
                setF2('')
                setF3('')               
            }
        }                 
    }
    // const deleteSection = async (sectionId:any) =>{
    //     const link = 'https://lmsg03.azurewebsites.net/api/Course/deletesection?sectionId='+sectionId
    //     const response = await fetch(link,{
    //         method: 'DELETE',
    //         headers: {'Content-Type': 'application/json'},
    //         credentials: 'include'
    //         });
    //         //const content = await response.json();
    // }

    
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
    
    const [listCourse, setlistCourse] = useState([])
    useEffect(() =>  {
        (
            async () => {          
                const link = 'https://lmsg03.azurewebsites.net/api/Course/getcourse'
                const response = await fetch(link,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                
                const content = await response.json();
                setlistCourse(content.data)
                setcourseId(content.data[0].courseId)                           
        }    
        )();
        },[]);
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
                setquizId(content.data[0].quizId)                             
        }    
        )();
        },[]);

    const [listQuestion, setlistQuestion] = useState([])
    // useEffect(() =>  {
    //     if(courseId !=='' && quizId !=='')
    //             {
    //                 (               
    //                     async () => {          
    //                         const link = 'https://lmsg03.azurewebsites.net/api/Questions/getquestionbyCourseIdAndQuizId/'+ courseId +'/'+ quizId
    //                         const response = await fetch(link,{
    //                             method: 'GET',
    //                             headers: {'Content-Type': 'application/json'},
    //                             credentials: 'include',
    //                         });
                                          
    //                         const content = await response.json();
    //                         if(content.data!=null)
    //                         {
    //                             setlistQuestion(content.data) 
    //                         }else
    //                         {
    //                             setlistQuestion([])
    //                         }
                                                        
    //                 }    
    //                 )();
    //             }
    // },[]);
    return(
        <form onSubmit={add} >
            <h1 style={{textAlign:'center'}}>Thêm question</h1>
            <div style={{display: 'flex',}}>
            <div style={right}>
            <label htmlFor="teacher">Chọn Khóa học: </label>
                <pre></pre>
                <select id='teacher' name="teacher" style={addTodoInputStype} value={courseId} onChange={(e)=>{
                setcourseId(e.target.value)
                if(courseId !=='' && quizId !=='')
                 {
                     (               
                         async () => {          
                             const link = 'https://lmsg03.azurewebsites.net/api/Questions/getquestionbyCourseIdAndQuizId/'+ courseId +'/'+ quizId
                             const response = await fetch(link,{
                                 method: 'GET',
                                 headers: {'Content-Type': 'application/json'},
                                 credentials: 'include',
                             });
                                           
                             const content = await response.json();
                             if(content.data!=null)
                             {
                                 setlistQuestion(content.data) 
                             }else
                             {
                                 setlistQuestion([])
                             }
                                                         
                     }    
                     )();
                 }
                }}>
                    {listCourse.map((todo: any, i)=>{
                    return <option value={todo.courseId}>Tên: {todo.courseName}</option>;
                    })}                            
                </select>
                <label htmlFor="teacher">Chọn quiz: </label>
                <pre></pre>
                <select id='teacher' name="teacher" style={addTodoInputStype} value={quizId} onChange={(e)=>{
                setquizId(e.target.value)
                console.log(quizId)
                if(courseId !=='' && quizId !=='')
                {
                    (               
                        async () => {          
                            const link = 'https://lmsg03.azurewebsites.net/api/Questions/getquestionbyCourseIdAndQuizId/'+ courseId +'/'+ quizId
                            const response = await fetch(link,{
                                method: 'GET',
                                headers: {'Content-Type': 'application/json'},
                                credentials: 'include',
                            });
                                          
                            const content = await response.json();
                            if(content.data!=null)
                            {
                                setlistQuestion(content.data) 
                            }else
                            {
                                setlistQuestion([])
                            }
                                                        
                    }    
                    )();
                }

                }}>
                    {listQuiz.map((todo: any, i)=>{
                    return <option value={todo.quizId}>Tên: {todo.quizName}</option>;
                    })}                            
                </select>
                <h5>Nhập question Text</h5>
                <input type='text' name='questionText' placeholder='questionText' style={addTodoInputStype}
                value={questionText}
                onChange={(e)=>setquestionText(e.target.value)}></input>
                <pre></pre>
                <h5>Nhập đáp án đúng</h5>
                <input type='text' name='t' placeholder='Đáp án đúng' style={addTodoInputStype}
                value={correct}
                onChange={(e)=>setT(e.target.value)}></input>
                <pre></pre>
                <h5>Nhập đáp sai 1</h5>
                <input type='text' name='f' placeholder='Đáp án sai' style={addTodoInputStype}
                value={wrong1}
                onChange={(e)=>setF1(e.target.value)}></input>
                <pre></pre>
                <h5>Nhập đáp sai 2</h5>
                <input type='text' name='f' placeholder='Đáp án sai' style={addTodoInputStype}
                value={wrong2}
                onChange={(e)=>setF2(e.target.value)}></input>
                <pre></pre>
                <h5>Nhập đáp sai 3</h5>
                <input type='text' name='t' placeholder='Đáp án sai' style={addTodoInputStype}
                value={wrong3}
                onChange={(e)=>setF3(e.target.value)}></input>
                <pre></pre>                             
            </div>
            </div>
            <input className="w-100 btn btn-lg btn-primary" type="submit" value="Thêm"/>
            <h5>Danh sách question:</h5>
            <div>
                {listQuestion.map((todo:any, i)=>{
                return (<div>
                    <p>{todo.questionText}</p>
                    <button onClick={()=>{}}>Xóa question</button>
                </div>)})}
            </div>                                                    
    </form>
    )
}

export default Addsection;
