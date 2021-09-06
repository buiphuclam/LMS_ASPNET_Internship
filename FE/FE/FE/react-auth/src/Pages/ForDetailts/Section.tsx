import React from 'react'
import './Section.css'

interface SectionProps{
    idSection:number;
    titleSection:string,
}


export default function Section(props: {sections:any}) {

    const sections = props.sections;
    const sectionList = sections.map((section:SectionProps) =>
    <ul className="section">
        <li>
            <div className="sectionFlex">
                <div className="SectionFont">
                    <img src="logo192.png" alt="section" className="iconSection" />
                    {section.titleSection}
                </div>
        
            {/* <button className="btn btn-outline-secondary" >Mark as done</button> */}
            </div>
        </li>
    </ul>
    
    )

    return (
        <>
            {sectionList}
            
        </>
    )
}
