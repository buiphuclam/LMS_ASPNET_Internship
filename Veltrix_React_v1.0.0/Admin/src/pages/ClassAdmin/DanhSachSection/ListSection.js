import React from 'react'
import {useState,useEffect} from "react"
import ListSectionProp from './ListSectionProp'

export default function ListSection(props) {

    const {courseId, listStudent} = props;
    const [sectionlist1, setSectionList] = useState([])
    

    

    const loadSection = async () => {
        // const courseId = GetURLParameter('courseId')            
        const link = 'https://lmsg03.azurewebsites.net/api/Course/getsection?courseId='+ courseId
        const response = await fetch(link,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        
        const content = await response.json();
        if(content.status === 200)
        {
            //console.log(content.data)
            setSectionList(content.data);
            loadSection();
        }

        if(sectionlist1 == '')
        {
            <div>Không có dữ liệu</div>
        }                     
    }  
    

    useEffect(() => {
        loadSection();
    }, []);



        const sectionlist = sectionlist1;
        const getsectionList =(sectionObject) => {
            return (
                <ListSectionProp  {...sectionObject} listStudent={listStudent}/>
            // </Col>
            );
        }
  
    const section = sectionlist.map(sectionObject => getsectionList(sectionObject));
    return (
        
        <div className="accordion" id="accordion">
            {section}
        </div>
    )
}
