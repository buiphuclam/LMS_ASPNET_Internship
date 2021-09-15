import React from 'react'
import { Collapse} from "reactstrap"
import {useState} from "react"


export default function ListSectionProp(props) {

    const {document, startDate,endDate,term,year,sectionCode} = props
    const [col1, setCol1] = useState(false);

    const t_col1 = () => {
        setCol1(!col1)
      }

    return (
        <>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button fw-medium" type="button" onClick={()=>t_col1()} style={{ cursor: "pointer" }}>
              {sectionCode}
                </button>
          </h2>


          <Collapse isOpen={col1} className="accordion-collapse">
            <div className="accordion-body">
              <div className="text-muted">
                <strong className="text-dark">Học kì: </strong>{term}  
                </div>
                <div className="text-muted">
                <strong className="text-dark">Bắt đầu - Kết thúc:</strong>
                 {startDate}-{endDate}
                </div>
            </div>
          </Collapse>
        </div>
        </>
    )
}
