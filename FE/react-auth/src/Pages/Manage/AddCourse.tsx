import React, { useEffect, useState } from 'react';

const AddCourse = (props: any) => {  
    const [courseName, setCourseName] = useState('');
    const [courseShortDetail, setcourseShortDetail] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [courseDocument, setCourseDocument] = useState('');
    const [coourseImg, setCourseImg] = useState('');
    
    const addTodoInputStype={
        flex: '10',
        padding :'5px',
        width: '300px'

    }
    const add = async (name: any) =>{
        name.preventDefault()
        
        if(courseName !== '')
        {                       
            const response = await fetch('https://lmsg03.azurewebsites.net/api/Course/addcourse',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                courseName,
                courseShortDetail,
                categoryId,
                courseDocument,
                coourseImg
                })
            });
            const content = await response.json();
            console.log(content)
            if(content.message === 'Success!')
            {  
                setCourseName('')
                setcourseShortDetail('')          
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
    };
    const [category, setCategory] = useState([])
    useEffect(() =>  {
        (
            async () => {               
                const link = 'https://lmsg03.azurewebsites.net/api/Category/getcategory'
                const response = await fetch(link,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                
                const content = await response.json();
                setCategory(content.data)
                if(categoryId == '')
                {
                    setcategoryId(content.data[1].categoryId) 
                }
                  
        }    
        )();
        });
    return(
        <form onSubmit={add} >
            <h1 style={{textAlign:'center'}}>Thêm Khóa Học</h1>
            <div style={{display: 'flex',}}>
            <div style={right}> 
                <h5>Tên: </h5>
                <input type='text' name='name' placeholder='Nhập tên khóa học' style={addTodoInputStype}
                value={courseName}
                onChange={(e:any)=>setCourseName(e.target.value)}></input>
                <pre></pre>
                <h5>Mô tả: </h5>
                <input type='text' name='text' placeholder='Nhập tả hóa học' style={addTodoInputStype}
                value={courseShortDetail}
                onChange={(e:any)=>setcourseShortDetail(e.target.value)}></input>
                <pre></pre>
                <label htmlFor="status">Chọn thể loại: </label>
                <pre></pre>
                <select id='status' name="status" style={addTodoInputStype} value={categoryId} onChange={(e:any)=>setcategoryId(e.target.value)}>
                    {category.map((todo: any, i)=>{
                    return <option value={todo.categoryId}>{todo.categoryShortDetail}</option>;
                    })}                            
                </select>
                <h5>Document: </h5>
                <input type='text' name='text' placeholder='Nhập Document' style={addTodoInputStype}
                value={courseDocument}
                onChange={(e:any)=>setCourseDocument(e.target.value)}></input>
                <pre></pre>
                <h5>Img: </h5>
                <input type='text' name='text' placeholder='Nhập Img' style={addTodoInputStype}
                value={coourseImg}
                onChange={(e:any)=>setCourseImg(e.target.value)}></input>
                <pre></pre>
                <input className="w-100 btn btn-lg btn-primary" type="submit" value="Thêm"/>
            </div>
            </div>                           
    </form>
    )
}

export default AddCourse;            
