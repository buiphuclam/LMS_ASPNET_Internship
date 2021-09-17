import { Button } from '@material-ui/core';
import React from 'react'
import AddSection from './AddSection'

import {
    CardTitle,
  } from "reactstrap"

const useStyle={
    formControl: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'left'
    },
    fontColor: {
        color: 'black'
    }
    
}
export default function ListCourse(props) {
    const { courseShortDetail, courseId,courseName, listTeacher} =props;

    return (
        <>
            <div style={useStyle.formControl}>
            <CardTitle className="h4" style={useStyle.fontColor}>
                {courseName}
                <p className="card-title-desc">
                {courseShortDetail}
                </p>
            </CardTitle>
            <AddSection courseid={courseId} courseName={courseName} listTeacher={listTeacher} />
            </div>
            {/* <p style={useStyle.formControl} className="card-title-desc">
              {courseShortDetail}
            </p> */}
           
        </>
    )
}
