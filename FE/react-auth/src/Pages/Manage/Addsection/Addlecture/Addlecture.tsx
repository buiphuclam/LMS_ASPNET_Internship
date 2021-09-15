import { Console } from 'console';
import React, { useEffect, useState } from 'react';

const Addlecture = (props: any) => { 
    const [lectureName, setlectureName] = useState('');
    const [lectureDetail, setlectureDetail] = useState('');
    const [lectureDate, setlectureDate] = useState('');
    const [description, setdescription] = useState('');
    const [document, setdocument] = useState('');
 
    const addTodoInputStype={
        flex: '10',
        padding :'5px',
        width: '300px'

    }

    const add = async (e:any) =>{
        e.preventDefault()
        const sectionId = GetURLParameter('sectionId')
        console.log(sectionId)
        if(sectionId !== '')
        {                    
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Lecture/addlecture',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                lectureName,
                lectureDetail,
                lectureDate,
                description,
                document,
                sectionId,
                })
            });
            const content = await response.json();
            console.log(content)
            if(content.message === 'Success!'){
                alert(content.message)                              
                //setTeacherId(listTeacher[1].id)
            }
        }                 
    }
    const deleteLecture = async (lectureId:any) =>{
        const link = 'https://lmsg03.azurewebsites.net/api/Lecture/deletelecture?lectureId='+lectureId
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
    const [listLecture, setlistLecture] = useState([])
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
                const sectionId = GetURLParameter('sectionId')             
                const link = 'https://lmsg03.azurewebsites.net/api/Lecture/getlecture'
                const response = await fetch(link,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(sectionId)
                });          
                const content = await response.json();
                setlistLecture(content.data.section.lectures)                            
        }    
        )();
        },[]);
    return(
        <form onSubmit={add} >
            <h1 style={{textAlign:'center'}}>Thêm chương trình cho lớp</h1>
            <div style={{display: 'flex',}}>
            <div style={right}>
                <h5>Tên chương</h5>
                <input type='text' name='lectureName' placeholder='Tên chương' style={addTodoInputStype}
                value={lectureName}
                onChange={(e)=>setlectureName(e.target.value)}></input>
                <pre></pre>
                <h5>Chi tiết bài giảng</h5>
                <input type='text' name='lectureDetail' placeholder='Chi tiết bài giảng' style={addTodoInputStype}
                value={lectureDetail}
                onChange={(e)=>setlectureDetail(e.target.value)}></input>
                <pre></pre>
                <h5>Ngày của bài giảng</h5>
                <input type='date' name='lectureDate' placeholder='Ngày của bài giảng' style={addTodoInputStype}
                value={lectureDate}
                onChange={(e)=>setlectureDate(e.target.value)}></input>                
                <pre></pre>
                <h5>Mô tả bài giảng</h5>
                <input type='text' name='description' placeholder='>Mô tả bài giảng' style={addTodoInputStype}
                value={description}
                onChange={(e)=>setdescription(e.target.value)}></input>
                <input type='text' name='document' placeholder='(document)' style={addTodoInputStype}
                value={document}
                onChange={(e)=>setdocument(e.target.value)}></input>              
            </div>
            </div>
            <input className="w-100 btn btn-lg btn-primary" type="submit" value="Thêm"/>                                      
            <pre></pre>
            <h5>Danh sách chương của lớp:</h5>
            <div>
                {listLecture.map((todo:any, i)=>{
                return (<div>
                    <p>{todo.lectureName}</p>
                    <button onClick={()=>{deleteLecture(todo.lectureId)}}>Xóa chương</button>
                </div>)})}
            </div>       
        
    </form>
    )
}

export default Addlecture;
