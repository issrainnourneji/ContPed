import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";

import TextField from "@mui/material/TextField";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


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

const AddCoursePage = () => {

    const navigate = useNavigate();
    const userData = localStorage.getItem("myData");
    const token = JSON.parse(userData).token;
    const user = JSON.parse(userData).user;
    const API_Url = "http://127.0.0.1:9000/courses/";
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
    };


    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    const [personName, setPersonName] = useState([]);
    const [requiredTitleCourseField, setRequiredTitleCourseField] = useState(false);
    const [requiredDescriptionCourseField, setRequiredDescriptionCourseField] = useState(false);

    const [courseData, setCourseData] = useState({
        courseName: "",
        courseDescription: "",
        courseContent: [],
        coursePhoto: "",
        courseCategory: [],
        courseOwner: user._id,
    });

    const handleCourseInputChange = (event) => {
        const { name, value } = event.target;
        setCourseData({
            ...courseData,
            [name]: value,
        });
        if(name === "courseName"){
            setRequiredTitleCourseField(false);
        }else if(name === "courseDescription"){
            setRequiredDescriptionCourseField(false);
        }

    };
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setCourseData({
                ...courseData,
                coursePhoto: img,
            });
        }
    };
    const submitData = (event) => {
        const myForm = document.getElementById("myForm");
        const formInputs = myForm.querySelectorAll("input");
        const formTextArea = myForm.querySelectorAll("textarea");
        console.log(courseData)
        if (myForm.checkValidity()) {
            if(formInputs[0].value.length > 3 && formInputs[0].value.match(/[a-zA-Z]/)){
                courseData.courseCategory = personName;
                axios
                    .post(API_Url + "addCourseTemplate", courseData, config)
                    .then((result) => {
                        if(result.status === 200){
                            navigate("/courseDashboard/"+result.data._id)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }else{
                setRequiredTitleCourseField(true);
            }
        } else {
            if(!formInputs[0].checkValidity()){
                setRequiredTitleCourseField(true);
            }else{
                setRequiredTitleCourseField(false);
            }
            if(!formTextArea[0].checkValidity()){
                setRequiredDescriptionCourseField(true);
            }else{
                setRequiredDescriptionCourseField(false);
            }
        }
    };


    // console.log(courseData)
    return(
        <>
        <div id="content-page" className="content-page">
            <Container>
                <Row>
                    <Card>
                        <Col lg="12">
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h2 className="card-title">General Information About The Course</h2>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form id="myForm" encType="multipart/form-data">
                                    <Form.Group className="form-group">
                                        <TextField
                                            error={requiredTitleCourseField}
                                            id="outlined-basic"
                                            label="Course Title"
                                            name="courseName"
                                            fullWidth
                                            variant="outlined"
                                            required
                                            onChange={handleCourseInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <TextField
                                            error={requiredDescriptionCourseField}
                                            style={{marginTop:"30px"}}
                                            id="outlined-multiline-static"
                                            label="Course description"
                                            name="courseDescription"
                                            required
                                            multiline
                                            fullWidth
                                            rows={8}
                                            onChange={handleCourseInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group style={{marginTop:"30px"}} className="form-group">
                                        <Form.Label className="custom-file-input">
                                            Course Image
                                        </Form.Label>{" "}
                                        <Form.Control
                                            name="coursePhoto"
                                            type="file"
                                            id="courseImage"
                                            onChange={onImageChange}
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

                                </Form>
                            </Card.Body>
                        </Col>
                        <Button
                            style={{marginTop:"60px"}}
                            variant="outline-success"
                            className="rounded-pill mb-1"
                            onClick={(event) => submitData(event)}
                            >Next</Button>{' '}
                        <Button
                            variant="outline-danger"
                            className="rounded-pill mb-1"
                            onClick={(e)=>navigate("/")}
                            >Cancel</Button>{' '}
                    </Card>
                </Row>
            </Container>
            </div>
        </>
    );

};

export default AddCoursePage;