import React from 'react'
import './ItemChapter.css'
import Section from './Section'

interface ItemChapterProps{
    idChapter: number;
    titleChapter:string;
    content: string;
    idSection:string;
    sectionforchapter:any;
}


export default function ItemChapter(props: {chapters:any}) {
 

      const chapterList = props.chapters.map((chapter:ItemChapterProps) =>
        <div className="course-content fontChapter">
            <div className="chapter-content">
                <h3 style={{color:'black'}}>{chapter.titleChapter}</h3>
                <div className="content ">
                    {chapter.content}
                </div>
                
                <Section sections={chapter.sectionforchapter} />
            </div>
            <div className="line"></div>
        </div>
        
      )

    return (
        <>
            {chapterList}
        </>
    )
}
