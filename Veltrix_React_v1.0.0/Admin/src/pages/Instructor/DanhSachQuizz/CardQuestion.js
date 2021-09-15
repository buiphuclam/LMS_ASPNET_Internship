import React from 'react'
import {useEffect,useState} from "react"
import CardQuestionProps from "./CardQuestionProps";

import {
    Row,
    Col,
    Card,
    Form,
    CardBody,
    CardTitle,
    CardSubtitle,
    Container,
    Button,
} from "reactstrap"



export default function CardQuestion(props) {
    const {quizId} = props
    // const{quizId}=props
    const [listQuess, setlistQuess] = useState([])
    useEffect(() =>  {
        (
            
            async () => {          
                const link = 'https://lmsg03.azurewebsites.net/api/Questions/getquestionbyQuizId/' + quizId
                const response = await fetch(link,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                
                const content = await response.json();
                if(content.data !== null)
                {
                setlistQuess(content.data)
                console.log(content.data)
                console.log(quizId)
               

                }

                // setquizId(content.data[0].quizId)                             
        }    
        )();
        },[]);

        const getListQuess =(value) => {
            return (
                <CardQuestionProps {...value} />
              );
          }
        const Quess = listQuess.map(value => getListQuess(value))
    return (
        <>
        {Quess}
        </>

    )
}
