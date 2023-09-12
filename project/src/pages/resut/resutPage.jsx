import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';


import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import templatePDF from '../../assets/images/templatePDF.jpg';

const ResultPage = () => {

    const navigate = useNavigate();
    const idTest = useParams().idTest;
    const idUser = useParams().idUser;
    const USER = localStorage.getItem('myData');
    const userData = JSON.parse(USER).user
    const API_url = "http://127.0.0.1:9000/";

    const [resultObject, setResultObject] = useState(null);
    const [allCourseData, setAllCourseData] = useState(null);
    const [testData, setTestData] = useState(null);

//this fct is to apply to a course
    const handleApplyToCourse = async (id) => {
        await axios.put(API_url+"courses/applyToCourse/"+id, {
            userID: idUser
          }).then(
            (result) => { navigate("/dashboards/app/profile-events"); }
          ).catch(
            (error) => { console.log(error); }
          )
    }

//this fct is to generate the pdf of the result
    const pdfGenerate = () => {
        var doc = new jsPDF();
        doc.addImage(templatePDF, 'pdf', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
        doc.text( userData.fullName, 105, 120, { align: 'center' } );
        doc.text( testData.testTitle, 128, 188, { align: 'center' } );
        doc.text( `${resultObject.testResult}`, 112, 200, { align: 'center' } );
        doc.save('certificate.pdf');
    }

//this useEffect for fetching the result of the Test
    useEffect(() => {
        const fetchResultData = async () => {
            await axios.get("http://127.0.0.1:9000/tests/getResult/"+idTest+"/"+idUser)
                .then( (result) => { setResultObject(result.data) } )
                .catch( (error) => { console.log(error) } )
        };

        fetchResultData();
    },[]);
    
//this useEffect for fetching all the courses data and the test data
    useEffect(() => {
        const fetchAllCoursesData = async () => {
            await axios.get(API_url+"courses/getAllCourses").then(
                async (result) => {
                  setAllCourseData(result.data);
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
        };
        const fetchTestData = async () => {
            await axios.get(API_url+"tests/getTestDataById/"+idTest).then(
                (result) => { setTestData(result.data); }
            ).catch(
                (error) => { console.log(error) }
            )
        };

        fetchAllCoursesData();
        fetchTestData();
    },[])


    // console.log(testData)

//if the resultObject is fetched
    if(resultObject && allCourseData && testData){
//if the didUserPassTest = true means that the user has passed the test
        return(resultObject.didUserPassTest) ? (
            <>
            <div id='content-page' className='content-page'>
                <Container>
                    <Row>
                        <Col sm="200" lg="25">
                            <Card>
                                <Card.Header>
                                    <h1>
                                        Test Result : {testData.testTitle}
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
                                    <Card.Text>Congrats on nailing the test with a score of <b>{resultObject.testResult}%</b> Correct Answers. You can download your Certificate by clicking bellow. CODE FOR LIFE !!</Card.Text>
                                    <div style={{marginLeft:"270px"}}>
                                        <Button variant="primary" onClick={(e) => pdfGenerate()} style={{marginRight:"10px"}} to="#" className="btn btn-primary btn-block">download Certificate</Button>
                                        <Button variant="primary" onClick={(e) => navigate("/")} className="btn btn-primary btn-block">Go back Home</Button>
                                    </div>
                                    </Card.Body>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            </>
//if the didUserPassTest = false means that the user has not passed the test
        ): (
            <>
            <div id='content-page' className='content-page'>
                <Container>
                    <Row>
                        <Col sm="200" lg="25">
                            <Card>
                                <Card.Header>
                                    <h1>
                                        Test Result of : {testData.testTitle}
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
                                    <Card.Title as="h2" style={{textAlign: "center"}}>Good Job</Card.Title>
                                    <Card.Text>We are SORRY to inform you that you failed the test. You only got <b>{resultObject.testResult}%</b> of the answers. You can retry at any time, KEEP CODING !!!</Card.Text>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button variant="primary" onClick={(e) => navigate("/dashboard/app/profile-forum")} style={{marginRight:"10px"}} to="#" className="btn btn-primary btn-block">go to tests list</Button>
                                        <Button variant="primary" onClick={(e) => navigate("/")} className="btn btn-primary btn-block">Go back Home</Button>
                                    </div>
                                    </Card.Body>
                                    <Row style={{marginTop:"50px"}}>
                                        {testData.testCategory.map(
                                            (category) => (
                                                <>
                                                {allCourseData.map(
                                                    (course) => (
                                                        <>
                                                        {(course.courseCategory.includes(category)) ? (
                                                            <>
                                                            <Col lg="4" className=" text-center">
                                                                <Card className=" mb-3">
                                                                    <Card.Body>
                                                                        <Card.Title as="h4">{course.courseName}</Card.Title>
                                                                        <Card.Text>{course.courseDescription}</Card.Text>
                                                                        {(course.courseSubcribed.includes(idUser)) ? (
                                                                            <>
                                                                            <Button variant="primary" className="btn btn-primary btn-block" disabled>Apply to this course</Button>
                                                                            </>
                                                                        ):(
                                                                            <>
                                                                            <Button variant="primary" className="btn btn-primary btn-block" onClick={(e) => handleApplyToCourse(course._id)}>Apply to this course</Button>
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
                                            )
                                        )}
                                    </Row>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            </>
        )
//if the resultObject still not fetched from database
    }else{
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
    }
};


export default ResultPage;