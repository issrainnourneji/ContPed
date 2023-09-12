import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';



import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import img07 from '../../assets/images/page-img/07.jpg';

const FinishedCourse = () => {

    const API_url = "http://127.0.0.1:9000/";
    const idCourse = useParams().id;
    const userData = localStorage.getItem('myData');
    const userId = JSON.parse(userData).user._id;
    const navigate = useNavigate();

    const [courseData, setCourseData] = useState(null);
    const [testsDataArray, setTestsDataArray] = useState(null);
    const [testsFiltred, setTestsFiltred] = useState([]);

//this useEffect is for fetching the course data
    useEffect(() => {
        const fetchCourse = async () => {
            await axios.get("http://127.0.0.1:9000/courses/getCourseById/"+idCourse).then(
                (result) => { setCourseData(result.data) }
            ).catch(
                (error) => { console.log(error) }
            )
        };

        fetchCourse();
    }, []);
//this useEffect is for fetching the recommended tests
    useEffect(() => {
        const fetchAllTestsData = async () => {
            await axios.get(API_url+"tests/getAllTestData").then(
                (result) => {
                    const data = result.data;
                    setTestsDataArray(data);
                }
            ).catch( (error) => console.log("error getting data"+error))
        };
        fetchAllTestsData();
    },[])

    const handleClickApplyTest = (id) => {
        axios.put("http://127.0.0.1:9000/tests/applyUserById/"+id, {
            "userID": userId
        }).then((res) => { navigate("/dashboard/app/profile-forum")});
    }

    // console.log(testsFiltred)

//wait till courseData is fetched
    return(courseData && testsDataArray ? (
//check if the connected User is subscribed to this course
        courseData.courseSubcribed.includes(userId) ? (
            <>
            <div id='content-page' className='content-page'>
                <Container>
                    <Row>
                        <Col sm="12" lg="25">
                            <Card>
                                <Card.Header>
                                    <h1>
                                        Course <b>{courseData.courseName}</b> finished
                                    </h1>
                                </Card.Header>
                                {/** this is the bar of next and back */}
                                <MobileStepper
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    variant="progress"
                                    steps={10} //lahne l nombre de questions
                                    position="static"
                                    activeStep={9} //lahne tzid +1 kol next button submited
                                />
                                {/** ends here */}
                                <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title as="h2" style={{textAlign: "center"}}>Congrats</Card.Title>
                                    <Card.Text>Congrats on finishing the course. We would really appreciate if you can rate this  clicking
                                        bellow. CODE FOR LIFE !!</Card.Text>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button variant="primary" onClick={(e) => navigate("/ratingsCourse/"+idCourse)} style={{marginRight:"10px"}} to="#" className="btn btn-primary btn-block">Rate this course</Button>
                                        <Button variant="primary" onClick={(e) => navigate("/")} className="btn btn-primary btn-block">Go back Home</Button>
                                    </div>
                                    </Card.Body>

                                    <Row style={{marginTop:"50px"}}>
                                    {courseData.courseCategory.map(
                                        (category) => (
                                            <>
                                            {testsDataArray.map(
                                                (test) => (
                                                    <>
                                                    {(test.testCategory.includes(category))?(
                                                        <>
                                                        <Col lg="4" className=" text-center">
                                                            <Card className=" mb-3">
                                                                <Card.Body>
                                                                <Card.Title as="h4">{test.testTitle}</Card.Title>
                                                                <Card.Text>{test.testDescription}</Card.Text>
                                                                {(test.listOfSubcribed.includes(userId)) ? (
                                                                    <>
                                                                    <Button variant="primary" className="btn btn-primary btn-block" disabled>Apply to this test</Button>
                                                                    </>
                                                                ):(
                                                                    <>
                                                                    <Button variant="primary" className="btn btn-primary btn-block" onClick={(e) => handleClickApplyTest(test._id)}>Apply to this test</Button>
                                                                    </>
                                                                )}
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        </>
                                                    ):""}
                                                    </>
                                                )
                                            )}
                                            </>
                                        ))
                                        
                                    }
                                    </Row>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            </>
//if the connected User isn't subscribed to this course render this
        ) : (
            <>
            <Container>
                <h2>You're not subscribed to this course. go back to <Link to="/dashboards/app/profile-events">courses list</Link></h2>
            </Container>
            </>
        )
//if courseData isn't fetched yet render this
    ) : (
        <>
            <Container>
                <div style={{margin:"250px 350px"}}>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
                <div style={{textAlign:"center"}}>
                    <h2>if the LOADING took too long.. Go <Link to={"/home"}>Home</Link></h2>
                </div>

            </Container>
        </>
    )

    )
};


export default FinishedCourse;