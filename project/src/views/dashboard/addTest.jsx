import React,{useState, useEffect} from 'react';
import axios from 'axios';

import {Row, Col, Form, Container, Card} from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { Padding } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import { red } from '@material-ui/core/colors';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  '1ère année',
  '2ème année',
  '3ème année',
  '4ème année',
  '5ème année',
  '6ème année'
];

const AddTestComponent = () => {

    
    const userData = localStorage.getItem("myData");
    const token = JSON.parse(userData).token;
    const user = JSON.parse(userData).user;
    const API_url = 'http://127.0.0.1:9000/tests/';
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [alertVisibility, setAlertVisibility] = useState(false);
    const [alertVisibilityF, setAlertVisibilityF] = useState(false);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
    const [questionData, setQuestionData] = useState("");
    const [suggestionData1, setSuggestionData1] = useState("");
    const [suggestionData2, setSuggestionData2] = useState("");
    const [suggestionData3, setSuggestionData3] = useState("");
    const [suggestionData4, setSuggestionData4] = useState("");
    const [selectionOption, setSelectionOption] = useState("");
    
    const [testData, setTestData] = useState({
        testTitle: "",
        testDescription: "",
        testTimer: null,
        listOfQuestions: [
            {
                questionTitle: "",
                suggestedResponse: [],
                correctResponse: "",
            }
        ],
        listOfRatesTest: [],
        testCategory: [],
        testOwner: user._id
    });

    const [personName, setPersonName] = useState([]);
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };


    const handleClose = (event, reason) => {
        if(reason === "clickaway"){
            return;
        }
        setAlertVisibility(false);
        setAlertVisibilityF(false);
    }
    const handleAddQuestion = () => {
        let newQuestion = {
            questionTitle: "",
            suggestedResponse: [],
            correctResponse: "",
        };
        testData.listOfQuestions.push(newQuestion);
        setTestData({...testData, listOfQuestions: testData.listOfQuestions});
    };
    //check this bug of the delete question 
    const handleDeleteQuestion = (index) => {
        let questionsArray = testData.listOfQuestions;
        questionsArray.splice(index,1);
        setTestData({
            ...testData,
            listOfQuestions: questionsArray
        });
        if(testData.listOfQuestions.length === 1){
            setDeleteButtonDisabled(true);
        }
    }
    const handleInputTest = (event) => {
        const {name, value} = event.target;
        setTestData({
            ...testData,
            [name]:value
        })
    };
    const handleQuestionTitleInputChange = (event, index) => {
        let questionsArray = testData.listOfQuestions;
        setQuestionData(event.target.value);
        questionsArray[index].questionTitle = questionData;
    };
    const handleSuggestionInputChange = (event, index) => {
        const {name, value} = event.target;
        let questionsArray = testData.listOfQuestions;
        (name === "suggestionData1") ? ( setSuggestionData1(value) ) 
            : ( name === "suggestionData2" ) ? ( setSuggestionData2(value) )
            : ( name === "suggestionData3" ) ? ( setSuggestionData3(value) )
            : ( setSuggestionData4(value) );
        questionsArray[index].suggestedResponse = [suggestionData1, suggestionData2, suggestionData3, suggestionData4];

    };
    const handleSelectChange = (event, index) => {
        setSelectionOption(event.target.value);
        const correctAnswer = testData.listOfQuestions[index].suggestedResponse[event.target.value -1];
        testData.listOfQuestions[index].correctResponse = correctAnswer;
    };
    useEffect(() => {
        const verifDeleteButton = () => {
            if(testData.listOfQuestions.length > 1) {
                setDeleteButtonDisabled(false);
            }
        };
        verifDeleteButton();
        setTestData(testData);
    },[testData]);


    const submitData = (event) => {
        const myForm = document.getElementById("myForm");
        if( myForm.checkValidity() ){
            if(testData.testTimer){
                testData.testCategory = personName;
                axios.post(API_url+"addTest", testData).then(
                    (result) => {
                        console.log("success");
                        setAlertVisibility(true);
                    }
                ).catch( (error) => {
                        console.log(error);
                });
            }else{
                const dataTest = {
                    testTitle: testData.testTitle,
                    testDescription: testData.testDescription,
                    listOfQuestions: testData.listOfQuestions,
                    testCategory: personName,
                    testOwner: user._id
                };
                axios.post(API_url+"addTest", dataTest).then(
                    (result) => {
                        console.log("success");
                        setAlertVisibility(true);
                    }
                ).catch( (error) => {
                        console.log(error);
                });
            }
        }else{
            console.log("form invalid");
            const formInputs = myForm.querySelectorAll("input");
            const formTextArea = myForm.querySelectorAll("textarea");
            const formSelect = myForm.querySelectorAll("select");
            if(!formInputs[0].checkValidity()){
                formInputs[0].style = "border-color: red;"
            }else{
                formInputs[0].style = "border-color: gray;"
            }
            if(!formInputs[1].checkValidity()){
                formInputs[1].style = "border-color: red;"
            }else{
                formInputs[1].style = "border-color: gray;"
            }
            if(!formInputs[2].checkValidity()){
                formInputs[2].style = "border-color: red;"
            }else{
                formInputs[2].style = "border-color: gray;"
            }
            if(!formInputs[3].checkValidity()){
                formInputs[3].style = "border-color: red;"
            }else{
                formInputs[3].style = "border-color: gray;"
            }
            if(!formInputs[4].checkValidity()){
                formInputs[4].style = "border-color: red;"
            }else{
                formInputs[4].style = "border-color: gray;"
            }
            if(!formInputs[5].checkValidity()){
                formInputs[5].style = "border-color: red;"
            }else{
                formInputs[5].style = "border-color: gray;"
            }
            if(!formTextArea[1].checkValidity()){
                formTextArea[1].style = "border-color: red;"
            }else{
                formTextArea[1].style = "border-color: gray;"
            }
            if(!formSelect[0].checkValidity()){
                formSelect[0].style = "border-color: red;"
            }else{
                formSelect[0].style = "border-color: gray;"
            }
            console.log(formInputs)
            // formInputs[2].style = "border-color: red;";
            setAlertVisibilityF(true);
        }
    }

    return(
        <>
        <div id='content-page' className='content-page'>
            <Container>
                <Row>
                    <Col sm="200" lg="25">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Test by DJA</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <form id ="myForm">

                                    <Form.Group className="form-group">
                                        <Form.Label>Test Title </Form.Label>
                                        <Form.Control
                                            name='testTitle'
                                            type="text"
                                            // defaultValue="this is a default value"
                                            placeholder="Enter Test Title"
                                            required
                                            onChange={handleInputTest}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label>Test Description</Form.Label>
                                        <Form.Control
                                            name='testDescription'
                                            as="textarea"
                                            placeholder="Enter Test Description"
                                            rows="5"
                                            onChange={handleInputTest}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label >Test Time</Form.Label>
                                        <Form.Control
                                            name='testTimer'
                                            type="time"
                                            defaultValue="00:15"
                                            onChange={handleInputTest}
                                            required
                                        />
                                    </Form.Group>

                                    <FormControl sx={{ m: 1, width: 300, marginTop:"30px", marginLeft:"0px" }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>

                                    <Divider style={{ margin: "13px 1px" }} variant="middle" />

                                    {testData.listOfQuestions.map((question, indexQuestion) => (
                                        <>
                                        <Form.Group className="form-group">
                                            <Form.Label>Question {indexQuestion+1}</Form.Label>
                                            <Form.Control
                                                name={`question${indexQuestion}`}
                                                as="textarea"
                                                rows={3}e
                                                placeholder={`Enter Question ${indexQuestion+1}`}
                                                required
                                                onChange={(event) => handleQuestionTitleInputChange(event, indexQuestion)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>Suggestion 1 </Form.Label>
                                            <Form.Control
                                                name='suggestionData1'
                                                type="text"
                                                required
                                                placeholder="Enter Suggestion 1"
                                                onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>Suggestion 2 </Form.Label>
                                            <Form.Control
                                                name='suggestionData2'
                                                type="text"
                                                placeholder="Enter Suggestion 2"
                                                required
                                                onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>suggestion 3 </Form.Label>
                                            <Form.Control
                                                name='suggestionData3'
                                                type="text"
                                                placeholder="Enter Suggestion 3"
                                                required
                                                onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>Suggestion 4 </Form.Label>
                                            <Form.Control
                                                name='suggestionData4'
                                                type="text"
                                                placeholder="Enter Suggestion 4"
                                                required
                                                onChange={(event) => handleSuggestionInputChange(event,indexQuestion)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>Correct Answer</Form.Label>
                                            <select
                                                key={indexQuestion}
                                                className="form-select mb-3 shadow-none"
                                                value={selectionOption}
                                                onChange={(event) => handleSelectChange(event, indexQuestion)}
                                                required
                                            >
                                                <option defaultValue={"0"}></option>
                                                <option value="1">{testData.listOfQuestions[indexQuestion].suggestedResponse[0]}</option>
                                                <option value="2">{testData.listOfQuestions[indexQuestion].suggestedResponse[1]}</option>
                                                <option value="3">{testData.listOfQuestions[indexQuestion].suggestedResponse[2]}</option>
                                                <option value="4">{testData.listOfQuestions[indexQuestion].suggestedResponse[3]}</option>
                                            </select>
                                        </Form.Group>
                                        <Button
                                            style={{marginBottom: "10px"}}
                                            disabled={deleteButtonDisabled}
                                            variant="contained" 
                                            startIcon={<DeleteIcon />}
                                            onClick={(event) => {handleDeleteQuestion(indexQuestion)}}
                                        >
                                            Delete
                                        </Button>
                                        <Divider style={{ margin: "13px 1px" }} variant="middle" />
                                    
                                        </>
                                    ))}
                                    
                                    
                                    <Button
                                        variant="contained" 
                                        startIcon={<AddIcon />}
                                        onClick={handleAddQuestion}
                                    >
                                        Add question
                                    </Button>

                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Stack spacing={2} sx={{ width: '40%' }}>
                    <Button style={{left:"160%"}} variant="contained" color="success" onClick={submitData}>
                        submit
                    </Button>
                    <Snackbar open={alertVisibility} autoHideDuration={6000} onClose={handleClose} >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Test added successfully
                        </Alert>
                    </Snackbar>
                    <Snackbar open={alertVisibilityF} autoHideDuration={6000} onClose={handleClose} >
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Please fill out all the necessary fields
                        </Alert>
                    </Snackbar>
                </Stack>
                
            </Container>
        </div>
        
        </>
    );
};


export default AddTestComponent;