import React from 'react'
import ItemChapter from './ItemChapter';
import './ListChapter.css';


export default function ListChapter() {
    const chapters = [
        {idChapter: 1, titleChapter: 'aaaaaaa',content: "ui dui ui",
        sectionforchapter: [
            {idSection: 1, titleSection: 'chapter1.1'},
            {idSection: 2,  titleSection: 'chapter1.2',},
        ]},
        {idChapter: 2, titleChapter: 'bbbbbbb',content:"ui dui ui",
        sectionforchapter: [
            {idSection: 1, titleSection: 'chapter1.2'},
            {idSection: 2,  titleSection: 'chapter1.3',},
            {idSection: 3,  titleSection: 'chapter1.4',},
        ] },
        {idChapter: 3, titleChapter: 'ccccccc',content: "ui dui ui",
        sectionforchapter: [
            {idSection: 1, titleSection: 'chapter1.5'},
            {idSection: 2,  titleSection: 'chapter1.6',},
        ] },
        {idChapter: 4, titleChapter: 'ddddddd',content: "ui dui ui",
        sectionforchapter: [
            {idSection: 1, titleSection: 'chapter1.7'},
            {idSection: 2,  titleSection: 'chapter1.8',},
        ] },
      ];
    
    return (
        <>
        <div className="mid">
            <div className="card">
                <ItemChapter chapters={chapters} />
                
            </div>
        </div>
        
        </>
    )
}
