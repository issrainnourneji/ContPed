import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import {Row, Col, Form, Container, Card} from 'react-bootstrap';
import { List, ListItem, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const defaultRemainingTime = {
    seconds: "0",
    minutes: "0",
    hours: "0"
}

const TestComponent = () => {

    //general variables
    const userData = localStorage.getItem('myData');
    const currentConnectedUser = JSON.parse(userData).user;
    const currentConnectedToken = JSON.parse(userData).token;
    const idTest = useParams().id;
    const API_url = "http://127.0.0.1:9000/tests/";

    const navigate = useNavigate();

    //states
    const timerId = useRef();
    const [resultDataSubmitted, setResultDataSubmitted] = useState(false);
    const [quizzFinished, setQuizzFinished] = useState(false);
    const [finishedButtonClicked, setFinishedButtonClicked] = useState(false);
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const [testData, setTestData] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedCurrentValue, setSelectedCurrentValue] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [indexCurrentQuestion, setIndexCurrentQuestion] = useState(0);
    const [questionsArray, setQuestionArray] = useState(null);
    const [scoreQuizz, setScoreQuizz] = useState(0);
    const [finalScoreQuizz, setFinalScoreQuizz] = useState(0);
    

    const handleNextClick = (correctAnswer) => {
        setIsChecked(false);
        setIndexCurrentQuestion(indexCurrentQuestion+1);
        if(selectedCurrentValue === correctAnswer){
            setScoreQuizz(scoreQuizz+1);
        };
    };
    const setSelectedValue = (value) => {
        setIsChecked(true);
        setSelectedCurrentValue(value);
    };
    const handleSubmitQuizz = async (correctAnswer) => {
        setIndexCurrentQuestion(indexCurrentQuestion+1);
        if(selectedCurrentValue === correctAnswer){
            setFinalScoreQuizz( ( (scoreQuizz +1) / questionsArray.length) * 100 );
        }else{
            setFinalScoreQuizz( (scoreQuizz / questionsArray.length) * 100 );
        };
        setQuizzFinished(true);
        setFinishedButtonClicked(true);
    }
    useEffect(() => {
        const fetchTestData = async () => {
            const test = await axios.get(API_url+"getTestDataById/"+idTest);
            setTestData(test.data);
        }
        fetchTestData();
    },[]);
    //fetch the question when the indexCurrentQuestion changes
    useEffect(() => {
        if(testData){
            setQuestionArray(testData.listOfQuestions);
        }
        
    },);
    //getting the timer and setting it up once the page loaded
    useEffect(() => {
        if(testData){
            const [initialHours, initialMinutes] = testData.testTimer.split(":");
            setRemainingTime({
                seconds: "0",
                minutes: initialMinutes,
                hours: initialHours
            })
        }
    },[testData]);
    // this section is for the timer and its handling
    const handleTimer = (objet) => {
        if(objet.seconds -1 < 0 ){
            if(objet.minutes -1 < 0 ){
                setRemainingTime({
                    minutes: objet.minutes - 1
                })
            }
        }
        console.log(remainingTime)
    }
    useEffect(() => {
        timerId.current = setInterval(() => {
            if(remainingTime.seconds -1 < 0) {
                if(remainingTime.minutes -1 < 0 ){
                    if(remainingTime.hours -1 >= 0){
                        setRemainingTime({
                            ...remainingTime,
                            hours: remainingTime.hours - 1,
                            minutes: 60
                        })
                    }else{
                        setQuizzFinished(true);
                    }
                }else{
                    setRemainingTime({
                        ...remainingTime,
                        minutes: remainingTime.minutes - 1,
                        seconds: 60
                    })
                }
            }else{
                setRemainingTime({
                    ...remainingTime,
                    seconds: remainingTime.seconds - 1,
                })
            }
            // console.log(remainingTime)
        }, 1000);
        return () => clearInterval(timerId.current)
    },)

    
    // console.log(`la reponse selected: ${selectedCurrentValue}\nle score: ${scoreQuizz}\nscore final : ${finalScoreQuizz}`);
    // console.log(remainingTime)

    if(testData && questionsArray){
        if(quizzFinished){
            if(finishedButtonClicked){
                const resultObject = {
                    userId: currentConnectedUser._id,
                    testId: idTest,
                    testResult: finalScoreQuizz,
                    didUserPassTest: (finalScoreQuizz>80)
                };
                axios.post(API_url+"addResult", {resultObject: resultObject})
                    .then(
                        (result) => {
                            console.log(result);
                            navigate("result/"+currentConnectedUser._id);
                            setResultDataSubmitted(true);
                        }
                    ).catch(
                        (error) => {console.log(error)}
                    );
            }else{
                setFinalScoreQuizz( (scoreQuizz / questionsArray.length) * 100 );
                const resultObject = {
                    userId: currentConnectedUser._id,
                    testId: idTest,
                    testResult: finalScoreQuizz,
                    didUserPassTest: (finalScoreQuizz>80)
                };
                if(!resultDataSubmitted){
                    axios.post(API_url+"addResult", {resultObject: resultObject})
                    .then(
                        (result) => {
                            console.log(result);
                            navigate("result/"+currentConnectedUser._id);
                            setResultDataSubmitted(true);
                        }
                    ).catch(
                        (error) => {console.log(error)}
                    );
                }
                
            }
            
        }else{
            return(
                <>
                    <div id='content-page' className='content-page'>
                        <Container>
                            <Row>
                                <Col sm="200" lg="25">
                                    <Card>
                                        <Card.Header>
                                            <h1>
                                                Test : {testData.testTitle}
                                                <h5 style={{marginLeft:"90%"}}>Timer : {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</h5>
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
                                                steps={testData.listOfQuestions.length} //lahne l nombre de questions 
                                                position="static"
                                                activeStep={indexCurrentQuestion} //lahne tzid +1 kol next button submited
                                            />
                                        {/** ends here */}
    
                                        <h3 style={{textAlign:"center", marginBottom: "10px"}}>{testData.listOfQuestions[indexCurrentQuestion].questionTitle}</h3>
                                        {questionsArray[indexCurrentQuestion].suggestedResponse.map(
                                            (suggestedResponse, indexSuggestedResponse) => (
                                                <>
                                                <Form.Check className="d-block" style={{margin: "10px 10px"}}>
                                                    <Form.Check.Input
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        checked={false}
                                                        value={suggestedResponse}
                                                        onChange={(event) => setSelectedValue(event.target.value)}
                                                        />{' '}
                                                    <Form.Check.Label >
                                                        <h5>{suggestedResponse}</h5>
                                                    </Form.Check.Label>
                                                </Form.Check>
                                                </>
                                            )
                                        )}
                                        <div style={{marginBottom:"100px"}}></div>
                                        {(questionsArray.length > indexCurrentQuestion +1 ) ? (
                                            <Stack direction="row" spacing={2} style={{marginLeft:"45%"}}>
                                                <Button variant="contained" endIcon={<SendIcon />} disabled={!isChecked} onClick={(e) => handleNextClick(questionsArray[indexCurrentQuestion].correctResponse)}>
                                                    Next
                                                </Button>
                                            </Stack>
                                        ):(
                                            <Stack direction="row" spacing={2} style={{marginLeft:"45%"}}>
                                                <Button variant="contained" endIcon={<SendIcon />} disabled={!isChecked} onClick={(e) => handleSubmitQuizz(questionsArray[indexCurrentQuestion].correctResponse)}>
                                                    Submit
                                                </Button>
                                            </Stack>
                                        )}
                                        <div style={{marginBottom:"50px"}}></div>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
            )
        }
    }else{
        return (
            <>
            <Container>
                <div style={{margin:"250px 350px"}}>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
            </Container>
            </>
        )
    }


        // if(indexCurrentQuestion<0){
    //     navigate("/error")
    // }else if(testData.listOfSubcribed.includes(currentConnectedUser._id)){
    //     return(
    //         <>
    //         <div id='content-page' className='content-page'>
    //             <Container>
    //                 <Row>
    //                     <Col sm="200" lg="25">
    //                         <Card>
    //                             hello world
    //                         </Card>
    //                     </Col>
    //                 </Row>
    //             </Container>
    //         </div>
    //         </>
    //     )
    // }else{
    //     return(
    //         <>
    //         <Container>
    //             <h2>You're not subscribed to this test. go back to <Link to="dashboard/app/profile-forum">tests list</Link></h2>
    //         </Container>
    //         </>
    //     );
    // }
    
}


export default TestComponent;