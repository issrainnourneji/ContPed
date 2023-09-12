import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./chapterPopup.css"
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const ConfirmPopUp = (props) => {

    const navigate = useNavigate();


//this fct is used to REFRESH the page
    const refreshPage = () => {
        window.location.reload(false);
    };
//this fct is triggered when the Popup type is COURSE and DELETE COURSE is triggered
    const handleDeleteCourseButton = async () => {
        const idCourseToDelete = props.idCourse;
        const reqBody = {
            "id":idCourseToDelete
        };
        await axios
            .put("http://127.0.0.1:9000/courses/deleteCourseByIdLTS", reqBody)
            .then((result) => {
                console.log("COURSE DELETED SUCCESSFULLY");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

//this fct is triggered when the Popup type is CHAPTER and DELETE CHAPTER is triggered
    const handleDeleteChapterConfirmButton = async () => {
        if(props.chapterIdToDel){
            const reqBody = {
                "courseId": props.idCourse,
                "chapterId": props.chapterIdToDel
            };
            await axios
                .put("http://127.0.0.1:9000/courses/deleteChapterInCourse", reqBody)
                .then((result) => {
                    console.log("deleted SUCCESSFULLY");
                    refreshPage();
                })
                .catch((error) => {
                    console.log(error)
                });
        }else{
            console.log("Error while passing the id of the chapter to delete")
        }
    };

//this fct is triggered when the Popup type is QUIZZ and DELETE QUIZZ is triggered
    const handleDeleteQuizzConfirmButton = async () => { 
        const idCourse = props.idCourse;
        const reqBody = {
            "courseId": idCourse
        };
        await axios
            .put("http://127.0.0.1:9000/courses/deleteQuizzCourseById", reqBody)
            .then((result) => {
                console.log("Quizz DELETED SUCCESSFULLY");
                refreshPage();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return(props.trigger && props.typeConfirmPopup === 0)? (
        <>
        <div className="popup">
            <div className="popup-inner">
                <Button style={{marginLeft:"542px"}} className="clonse-btn" onClick={() => props.setTrigger(false)}>x</Button>
                <Card>
                    <Col lg="13">
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h2 className="card-title">Please Confirm</h2>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <h4>Are you sure you want to delete this course</h4>
                            <Button variant="outline-danger" className="rounded-pill mb-1" onClick={() => props.setTrigger(false)}>Cancel</Button>{' '}
                            <Button variant="outline-success" className="rounded-pill mb-1" onClick={handleDeleteCourseButton}>Confirm</Button>{' '}
                        </Card.Body>
                    </Col>
                </Card>
            </div>
        </div>
        </>
    ): (props.trigger && props.typeConfirmPopup === 1) ? (
        <>
        <div className="popup">
            <div className="popup-inner">
                <Button style={{marginLeft:"542px"}} className="clonse-btn" onClick={() => props.setTrigger(false)}>x</Button>
                <Card>
                    <Col lg="13">
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h2 className="card-title">Please Confirm</h2>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <h4>Are you sure you want to delete this chapter</h4>
                            <Button variant="outline-danger" className="rounded-pill mb-1" onClick={() => props.setTrigger(false)}>Cancel</Button>{' '}
                            <Button variant="outline-success" className="rounded-pill mb-1" onClick={handleDeleteChapterConfirmButton}>Confirm</Button>{' '}
                        </Card.Body>
                    </Col>
                </Card>
            </div>
        </div>
        </>
    ): (props.trigger && props.typeConfirmPopup === 2) ? (
        <>
        <div className="popup">
            <div className="popup-inner">
                <Button style={{marginLeft:"542px"}} className="clonse-btn" onClick={() => props.setTrigger(false)}>x</Button>
                <Card>
                    <Col lg="13">
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h2 className="card-title">Please Confirm</h2>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <h4>Are you sure you want to delete this Quizz</h4>
                            <Button variant="outline-danger" className="rounded-pill mb-1" onClick={() => props.setTrigger(false)}>Cancel</Button>{' '}
                            <Button variant="outline-success" className="rounded-pill mb-1" onClick={handleDeleteQuizzConfirmButton}>Confirm</Button>{' '}
                        </Card.Body>
                    </Col>
                </Card>
            </div>
        </div>
        </>
    ): "";
};

export default ConfirmPopUp;