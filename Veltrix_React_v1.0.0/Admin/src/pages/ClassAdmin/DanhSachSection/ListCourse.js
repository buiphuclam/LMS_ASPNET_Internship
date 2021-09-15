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

    }
}
export default function ListCourse(props) {
    const { courseShortDetail, courseId,courseName} =props;

    return (
        <>
            <div style={useStyle.formControl}>
            <CardTitle className="h4">{courseName}</CardTitle>
            <AddSection courseid={courseId} courseName={courseName} />
            </div>
            <p className="card-title-desc">
              {courseShortDetail}
            </p>
           
        </>
    )
}
