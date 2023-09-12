import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";

//this is where the PopUp components are imported
import Popup from "../../components/chapter/chapterComponent";
import ConfirmPopup from "../../components/chapter/confirmPopUp";
import AddQuizzPopup from "../../components/chapter/addQuizzPopup";

const AddChapters = () => {

    const navigate = useNavigate();
    const userData = localStorage.getItem("myData");
    const token = JSON.parse(userData).token;
    const user = JSON.parse(userData).user;
    const idCourse = useParams().id;
    const API_Url = "http://127.0.0.1:9000/courses/";
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    
    const [typeConfirmPopup, setTypeConfirmPopup] = useState(null);
    const [buttonPopUp, setButtonPopUp] = useState(false);
    const [isNewChapter, setisNewChapter] = useState(false);
    const [confirmPopupButton, setConfirmPopupButton] = useState(false);
    const [addQuizzPopupButton, setAddQuizzPopupButton] = useState(false);
    const [chapterPopUp, setChapterPopUp] = useState(null);
    const [chapterIdToDeleteLTS, setChapterIdToDeleteLTS] = useState(null);
    const [isThereQuizz, setIsThereQuizz] = useState(null);
    const [indexCh, setIndexCh] = useState(null);
    const [courseToUpdateData, setCourseToUpdateData] = useState(null);
    const [courseData, setCourseData] = useState({
        courseName: "",
        courseDescription: "",
        courseContent: [],
        coursePhoto: null,
        courseOwner: "",
    });

//this useEffect is used to fetch the Object Course by its Id
    useEffect(() => {
        const fetchCourseToUpdateData = async () => {
            await axios
                .get(API_Url + "getCourseById/" + idCourse)
                .then((result) => {
                setCourseToUpdateData(result.data);
                })
                .catch((error) => {
                console.log(error);
                });
        };
        
        fetchCourseToUpdateData();
    },[]);
//this useEffect is used to fetch all the data from Object Course
    useEffect(() => {
        const fetchChapterData = async () => {
            const chapterPromises = courseToUpdateData.courseContent.map(
                (chapterId) => {
                return axios.get(API_Url + "getChapterById/" + chapterId);
                }
            );
        
            const chapterResponses = await Promise.all(chapterPromises);
            const chapterData = chapterResponses.map(
                (chapterResponse) => chapterResponse.data
            );
        
            const coureToupdate = {
                courseName: courseToUpdateData.courseName,
                courseDescription: courseToUpdateData.courseDescription,
                coursePhoto: courseToUpdateData.coursePhoto,
                courseOwner: courseToUpdateData.courseOwner,
                courseQuizz: courseToUpdateData.courseQuizz,
                courseContent: chapterData.map((chapter) => ({
                    id: chapter._id,
                    chapterTitle: chapter.chapterTitle,
                    chapterParagraphs: chapter.chapterParagraphs.map((parag) => ({
                        paragraphTitle: parag.paragraphTitle,
                        paragraphContent: parag.paragraphContent,
                        paragraphVideos: parag.paragraphVideos,
                        paragraphImages: parag.paragraphImages,
                    })),
                })),
            };
            setCourseData(coureToupdate);
        };
    
        if (courseToUpdateData) {
          fetchChapterData();
        };
    },[courseToUpdateData]);
//this fct is triggered when the edit button is clicked, sets the chapter and pass it to the pop component
    const handleEdit = (index) => {
        setisNewChapter(false);
        setButtonPopUp(true);
        setChapterPopUp(courseData.courseContent[index]);
        setIndexCh(index);
    };
//this fct is triggered when the delete button of the course is clicked
    const handleDeletePopup = () => {
        setTypeConfirmPopup(0);
        setConfirmPopupButton(true);
    };
//this fct is to delete a chapter from a course
    const handleDeleteChapter = async (chapterIdToDelete) => {
        setTypeConfirmPopup(1);
        setConfirmPopupButton(true);
        setChapterIdToDeleteLTS(chapterIdToDelete);
        // const reqBody = {
        //     "courseId": idCourse,
        //     "chapterId": chapterIdToDelete
        // };
        // await axios
        //     .put(API_Url + "deleteChapterInCourse", reqBody)
        //     .then((result) => {
        //         console.log("deleted SUCCESSFULLY")
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     });
    };
//this fct is to delete a quizz from a course 
    const handleDeleteQuizz = () => {
        setTypeConfirmPopup(2);
        setConfirmPopupButton(true);
    };
//this fct is triggered when the add chapter button is clicked 
    const handleAddChapter = () => {
        setButtonPopUp(true);
        setisNewChapter(true);
    };
//this fct is triggered when the add Quizz button is clicked
    const handleAddQuizz = () => {
        setAddQuizzPopupButton(true);
    };

    // console.log(courseData);
    return(courseData) ? (
        <>
        <div id="content-page" className="content-page">
            <Container>
                <Row>
                    <Card>
                        <Row>
                            <div className="">
                                <div
                                    style={{
                                        height: "10px",
                                        marginTop: "3rem",
                                        marginBottom: "3rem",
                                    }}
                                    className="d-flex flex-row align-items-center justify-content-between mb-5"
                                >
                                    <h1 className=" " style={{ fontWeight: "bold" }}>
                                        {courseData.courseName} : 
                                    </h1>
                                    <div className="d-flex gap-3">
                                        <Button onClick={(e)=>navigate("/")}>Go Back Home</Button>
                                        <Button variant="danger" onClick={handleDeletePopup}>Delete Course</Button>
                                        <Button variant="success" onClick={handleAddChapter}>Add Chapter</Button>
                                        {/* <Button variant="success" disabled={courseData.courseQuizz} onClick={handleAddQuizz}>Add Quizz</Button> */}
                                    </div>
                                </div>
                            </div>
                            {courseData.courseContent.map(
                                (chapter, indexChapter) => (
                                    <>
                                    <Col lg="4">
                                        <Card className=" mb-3">
                                            <Card.Body>
                                                <Card.Title as="h4">{chapter.chapterTitle}</Card.Title>
                                                <Card.Text>This chapter has {chapter.chapterParagraphs.length} parag</Card.Text>
                                                <Button style={{marginRight:"7px"}} variant="danger" onClick={(e) => handleDeleteChapter(chapter.id) } className="mb-1">
                                                    delete
                                                </Button>
                                                <Button variant="primary" className="mb-1" onClick={() => handleEdit(indexChapter)}>
                                                    Edit
                                                </Button>

                                                
                                            </Card.Body>
                                        </Card>
                                    </Col>  
                                    </>
                                )
                            )}

{/** this is code for the card of a Quizz if it exists and its buttons edit and delete */}
                            { (courseData.courseQuizz) ? (
                                <>
                                <Col lg="13">
                                    <Card className=" mb-3">
                                        <Card.Body>
                                            <Card.Title style={{textAlign:"center"}} as="h4">Quizz</Card.Title>
                                            <Card.Text style={{textAlign:"center"}}>This is a quizz for this course</Card.Text>
                                            <div class="col-md-12 text-center">
                                                <Button style={{marginRight:"7px"}} variant="danger" className="mb-1" onClick={handleDeleteQuizz}>
                                                    delete
                                                </Button>
                                                <Button variant="primary" className="mb-1">
                                                    Edit
                                                </Button>
                                            </div>
                                            
                                        </Card.Body>
                                    </Card>
                                </Col>
                                </>
                            ): "" 
                            }


{/** this is code for confirm delete Popup and Add Chapter Popup and Add Quizz Popup */}
                            {/** Component ON WORK : MISSING ADD CHAPTER INTERFACE*/}
                            <Popup
                                trigger={buttonPopUp}
                                newChapter={isNewChapter}
                                setTrigger={setButtonPopUp}
                                chapter={chapterPopUp}
                                idCourse={idCourse}
                                indexChapter={indexCh}
                            />
                            <ConfirmPopup
                                trigger={confirmPopupButton}
                                setTrigger={setConfirmPopupButton}
                                typeConfirmPopup={typeConfirmPopup}
                                chapterIdToDel={chapterIdToDeleteLTS}
                                idCourse={idCourse}
                            />
                            {/** this Popup is STILL ON WORK */}
                            <AddQuizzPopup
                                trigger={addQuizzPopupButton}
                                setTrigger={setAddQuizzPopupButton}
                                idCourse={idCourse}
                            />
                            </Row>
                    </Card>
                </Row>
            </Container>
        </div>
        </>
    ): ""
};

export default AddChapters;