import React, { useEffect, useState } from 'react';

const Addsection = (props: any) => { 
    const [teacherId, setTeacherId] = useState('');
    const [year, setYear] = useState('2021');
    const [term, setTerm] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [document, setDocument] = useState('');
    
    
    const addTodoInputStype={
        flex: '10',
        padding :'5px',
        width: '300px'

    }

    const add = async (e:any) =>{
        e.preventDefault()
        const courseId = GetURLParameter('courseId')
        if(courseId !== '')
        {                    
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Course/addsection',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                courseId,
                teacherId,
                year,
                term,
                startDate,
                endDate,
                document
                })
            });
            const content = await response.json();
            if(content.message === 'Success!'){
                alert(content.message)
                setYear('2021')
                setTerm(1)
                setStartDate('')
                setEndDate('')
                setDocument('')               
                //setTeacherId(listTeacher[1].id)
            }
        }                 
    }
    const deleteSection = async (sectionId:any) =>{
        const link = 'https://lmsg03.azurewebsites.net/api/Course/deletesection?sectionId='+sectionId
        const response = await fetch(link,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            });
            //const content = await response.json();
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
    const [listTeacher, setListTeacher] = useState([])
    useEffect(() =>  {
        (
            async () => {               
                const link = 'https://lmsg03.azurewebsites.net//api/User/getteacher'
                const response = await fetch(link,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                
                const content = await response.json();
                setListTeacher(content.data)
                if(teacherId == '')
                {
                    setTeacherId(content.data[1].id) 
                }                 
        }    
        )();
        },[]);
    
    const [listSection, setListSection] = useState([])
    const GetURLParameter = (sParam:any) =>{
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return (sParameterName[1].toString());
            }
        }
    }
    useEffect(() =>  {
        (
            async () => {
                const courseId = GetURLParameter('courseId')             
                const link = 'https://lmsg03.azurewebsites.net/api/Course/getsection?courseId='+ courseId
                const response = await fetch(link,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                
                const content = await response.json();
                setListSection(content.data)                            
        }    
        )();
        });
    return(
        <form onSubmit={add} >
            <h1 style={{textAlign:'center'}}>Thêm lớp cho khóa học</h1>
            <div style={{display: 'flex',}}>
            <div style={right}>
            <label htmlFor="teacher">Chọn Giáo Viên: </label>
                <pre></pre>
                <select id='teacher' name="teacher" style={addTodoInputStype} value={teacherId} onChange={(e)=>setTeacherId(e.target.value)}>
                    {listTeacher.map((todo: any, i)=>{
                    return <option value={todo.id}>UserName: {todo.userName}/Email: {todo.email}</option>;
                    })}                            
                </select>
                <h5>Năm</h5>
                <input type='number' name='year' placeholder='Năm' style={addTodoInputStype}
                value={year}
                onChange={(e)=>setYear(e.target.value)}></input>
                <pre></pre>
                <h5>Học kỳ</h5>
                <input type='number' name='name' placeholder='Học kỳ' style={addTodoInputStype}
                value={term}
                onChange={(e)=>setTerm(e.target.valueAsNumber)}></input>
                <pre></pre>
                <h5>Ngày bắt đầu</h5>
                <input type='date' name='text' placeholder='startDate' style={addTodoInputStype}
                value={startDate}
                onChange={(e)=>setStartDate(e.target.value)}></input>                
                <pre></pre>
                <h5>Ngày kết thúc</h5>
                <input type='date' name='text' placeholder='endtDate' style={addTodoInputStype}
                value={endDate}
                onChange={(e)=>setEndDate(e.target.value)}></input>
                <input type='text' name='file' placeholder='Mô tả lớp(document)' style={addTodoInputStype}
                value={document}
                onChange={(e)=>setDocument(e.target.value)}></input>              
            </div>
            </div>
            <input className="w-100 btn btn-lg btn-primary" type="submit" value="Thêm"/>                                      
            <pre></pre>
            <h5>Danh sách lớp của khóa học:</h5>
            <div>
                {listSection.map((todo:any, i)=>{
                return (<div>
                    <p>{todo.sectionCode}</p>
                    <button onClick={()=>{deleteSection(todo.sectionId)}}>Xóa</button>
                </div>)})}
            </div>       
        
    </form>
    )
}

export default Addsection;
