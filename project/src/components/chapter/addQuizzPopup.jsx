import React, { useEffect, useState } from "react";

import "./chapterPopup.css"
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";


const AddQuizzPopup = (props) => {



    
//this fct is used to REFRESH the page
    const refreshPage = () => {
        window.location.reload(false);
    };


    return(props.trigger) ? (
        <>
        <div className="popup">
            <div className="popup-inner">
                <Button style={{marginLeft:"542px"}} className="clonse-btn" onClick={() => props.setTrigger(false)}>x</Button>
                <Card>
                    <Col lg="13">
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h2 className="card-title">Add Quizz PopUp</h2>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <h4>Welcome to adding quizz PopUp</h4>
                            <Button variant="outline-danger" className="rounded-pill mb-1" onClick={() => props.setTrigger(false)}>Cancel</Button>{' '}
                            <Button variant="outline-success" className="rounded-pill mb-1" >Confirm</Button>{' '}
                        </Card.Body>
                    </Col>
                </Card>
            </div>
        </div>
        </>
    ): ""
};

export default AddQuizzPopup;