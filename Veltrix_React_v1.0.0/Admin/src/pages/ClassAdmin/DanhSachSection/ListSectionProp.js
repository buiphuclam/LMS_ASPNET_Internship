import React from 'react'
import { Collapse,Row,Col,Button} from "reactstrap"
import {useState} from "react"
import AddStudent from "./AddStudent"

export default function ListSectionProp(props) {

    const {document, startDate,endDate,term,year,sectionCode, sectionId,listStudent} = props
    const [col1, setCol1] = useState(false);

    const t_col1 = () => {
        setCol1(!col1)
      }

    return (
        <>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <Row>
              <Col sm={11}>
              <button className="accordion-button fw-medium" type="button" onClick={()=>t_col1()} style={{ cursor: "pointer" }}>
              {sectionCode}
            </button>
              </Col >
              <Col sm={1}>
                <AddStudent sectionId={sectionId} listStudent={listStudent} />
              </Col>
            </Row>
            
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
