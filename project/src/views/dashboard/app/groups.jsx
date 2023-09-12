import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, Navigate } from "react-router-dom";
import ProfileHeader from "../../../components/profile-header";

import axios from "axios";

// images
import gi1 from "../../../assets/images/page-img/gi-1.jpg";
import user05 from "../../../assets/images/user/05.jpg";
import user06 from "../../../assets/images/user/06.jpg";
import user07 from "../../../assets/images/user/07.jpg";
import user08 from "../../../assets/images/user/08.jpg";
import user09 from "../../../assets/images/user/09.jpg";
import user10 from "../../../assets/images/user/10.jpg";
import img1 from "../../../assets/images/page-img/profile-bg1.jpg";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularProgress from '@mui/material/CircularProgress';

const Groups = () => {

  const API_url = "http://127.0.0.1:9000/";
  const currentConnectedUser = JSON.parse(localStorage.getItem("myData")).user;
  // console.log(currentConnectedUser)

  const [courseData, setCourseData] = useState(null);
  const [ownersData, setOwnersData] = useState({});
  const [coursePicture, setCoursePicture] = useState("http://127.0.0.1:9000/data/1681830270752-deddyPhotoDeProfil.jpg");
  console.log(ownersData)
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchAllCoursesData = async () => {
    await axios.get(API_url+"courses/getAllCourses").then(
      async (result) => {
        const data = result.data;
        setCourseData(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  const handleApplyingCourse = async (courseId) => {
    await axios.put(API_url+"courses/applyToCourse/"+courseId, {
      userID: currentConnectedUser._id
    }).then(
      (result) => {
        if(result.status == 200){
          console.log("applied successfully")
        }else{
          console.log("applied NON successfully")
        }
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect( () => {
    fetchAllCoursesData();
  },[]);

  useEffect(() => {
    const fetchOwnerData = async (id) => {
      await axios.get(API_url+"courses/getUserById/"+id).then(
        (succes) => {
          setOwnersData((prevState) => {
            return {
              ...prevState,
              [id]: succes.data.fullName // assuming that the name of the owner is stored in the "name" field of the response object
            };
          });
        }
      ).catch(
        (error) => {console.log(error)}
      );
    };
    if (courseData) {
      courseData.forEach((singleCourseData) => {
        const ownerId = singleCourseData.courseOwner;
        fetchOwnerData(ownerId);
      });
    }
  }, [courseData]);

  // const res = fetchOwnersData("64248c024db8ea26a26d203f");

  if(courseData){
    // console.log(courseData)
    return (
      <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="All Courses" value="1" />
                <Tab label="My Courses" value="2" />
                </TabList>
            </Box>


              <TabPanel value="1">
                <>
                <div id="content-page" className="content-page">
                  <Container>
          
                    { courseData.map((singleCourseData, indexCourse) => (
                      <>
                      { !(singleCourseData.courseOwner == currentConnectedUser._id) && !(singleCourseData.courseSubcribed.includes(currentConnectedUser._id)) ? (
                        <>
                        <div className="d-grid gap-3 d-grid-template-1fr-19">
                          <Card className="mb-0">
                            <div className="top-bg-image">
                              {/** insert image of course here */}
                              {`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}` === `http://127.0.0.1:9000/data/null` ? (
                                <>
                                <img
                                  style={{width:"100%", height:"300px"}}
                                  key={indexCourse}
                                  src={gi1}
                                  alt="profile-img"
                                />
                                </>
                              ): (
                                <>
                                <img
                                  style={{width:"100%", height:"300px"}}
                                  key={indexCourse}
                                  src={`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}`}
                                  alt="profile-img"
                                />
                                </>
                              )}
                            </div>
                            <Card.Body className=" text-center">
                            <div className="group-info pt-3 pb-3">
                              <h4 >
                                {singleCourseData.courseName}
                              </h4>
                              <p key={indexCourse}> {singleCourseData.courseDescription} </p>
                            </div>
                            <div className="group-details d-inline-block pb-3">
                              <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                                <li className="pe-3 ps-3">
                                  <p className="mb-0">Course By</p>
                                  <h6>{Object.entries(ownersData).find(([id,value]) => id === singleCourseData.courseOwner.toString())}</h6>
                                </li>
                              </ul>
                            </div>
                            
                            { singleCourseData.courseOwner == currentConnectedUser._id ? ( 
                                <>
                                <Link to={"/courseDashboard/"+singleCourseData._id}>
                                  <button type="submit" className="btn btn-primary d-block w-100">
                                    Update
                                  </button>
                                </Link>
                                </>
                              ): singleCourseData.courseSubcribed.includes(currentConnectedUser._id) ?
                              (
                                <>
                                <Link to={"/course/"+singleCourseData._id}>
                                  <button type="submit" className="btn btn-primary d-block w-100">
                                    Go to course
                                  </button>
                                </Link>
                                <Link to={"/ratingsCourse/" + singleCourseData._id}>
      <button type="submit" className="btn btn-primary d-block w-100">
        Rate this course
      </button>
    </Link>
                                </>
                              ): (
                                <>
                                <Link to={"/course/"+singleCourseData._id}>
                                  <button type="submit" className="btn btn-primary d-block w-100" onClick={(event) => handleApplyingCourse(singleCourseData._id)}>
                                    Apply
                                  </button>
                                </Link>
                                </>
                              ) }
                        </Card.Body>
                      </Card>
                      
                      </div>
                      </>
                      ):"" }
                      </>
                      
                    )) }
          
                  </Container>
                </div>
                </>
              </TabPanel>

              
              <TabPanel value="2">
                  <>
                  <div id="content-page" className="content-page">
                    <Container>
                    { courseData.map((singleCourseData, indexCourse) => (
                      <>
                      { singleCourseData.courseOwner == currentConnectedUser._id ? (
                        <>
                          <div className="d-grid gap-3 d-grid-template-1fr-19">
                            <Card className="mb-0">
                              <div className="top-bg-image">
                                {`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}` === `http://127.0.0.1:9000/data/null` ? (
                                    <>
                                    <img
                                      style={{width:"100%", height:"300px"}}
                                      key={indexCourse}
                                      src={gi1}
                                      alt="profile-img"
                                    />
                                    </>
                                  ): (
                                    <>
                                    <img
                                      style={{width:"100%", height:"300px"}}
                                      key={indexCourse}
                                      src={`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}`}
                                      alt="profile-img"
                                    />
                                    </>
                                )}
                              </div>
                              <Card.Body className=" text-center">
                              <div className="group-info pt-3 pb-3">
                                <h4>
                                  {singleCourseData.courseName}
                                </h4>
                                <p key={indexCourse}> {singleCourseData.courseDescription} </p>
                              </div>
                              <div className="group-details d-inline-block pb-3">
                                <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                                  <li className="pe-3 ps-3">
                                    <p className="mb-0">Course By</p>
                                    <h6>{Object.entries(ownersData).find(([id,value]) => id=== singleCourseData.courseOwner.toString())}</h6>
                                  </li>
                                </ul>
                              </div>
                              <Link to={"/courseDashboard/"+singleCourseData._id}>
                                <button type="submit" className="btn btn-primary d-block w-100">
                                  Update
                                </button>
                              </Link>
                          </Card.Body>
                        </Card>
                        
                      </div>
                        </>
                      ) : singleCourseData.courseSubcribed.includes(currentConnectedUser._id) ? (
                        <>
                        <div className="d-grid gap-3 d-grid-template-1fr-19">
                            <Card className="mb-0">
                              <div className="top-bg-image">
                                {`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}` === `http://127.0.0.1:9000/data/null` ? (
                                      <>
                                      <img
                                        style={{width:"100%", height:"300px"}}
                                        key={indexCourse}
                                        src={gi1}
                                        alt="profile-img"
                                      />
                                      </>
                                    ): (
                                      <>
                                      <img
                                        style={{width:"100%", height:"300px"}}
                                        key={indexCourse}
                                        src={`http://127.0.0.1:9000/data/${singleCourseData.coursePhoto}`}
                                        alt="profile-img"
                                      />
                                      </>
                                  )}
                              </div>
                              <Card.Body className=" text-center">
                              
                              <div className="group-info pt-3 pb-3">
                                <h4>
                                  {singleCourseData.courseName}
                                </h4>
                                <p key={indexCourse}> {singleCourseData.courseDescription} </p>
                              </div>
                              <div className="group-details d-inline-block pb-3">
                                <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                                  <li className="pe-3 ps-3">
                                    <p className="mb-0">Course By</p>
                                    <h6>{Object.entries(ownersData).find(([id,value]) => id=== singleCourseData.courseOwner.toString())}</h6>
                                  </li>
                                </ul>
                              </div>
                              <Link to={"/course/"+singleCourseData._id}>
                                <button type="submit" className="btn btn-primary d-block w-100">
                                  Go to course
                                </button>
                              </Link>
                          </Card.Body>
                        </Card>
                        
                        </div>
                        </>
                      ) : (
                        <></>
                      )}
                      </>
                    ))}
                    </Container>
                  </div>
                  </>
              </TabPanel>
            </TabContext>
          </Box>
      </>
    );
  }else{
    return (
      <>
        <Container>
          <div style={{margin:"250px 350px"}}>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
          <div style={{textAlign:"center"}}>
            <h2>if the LOADING took too long.. Go <Link to={"/"}>Home</Link></h2>
          </div>
        </Container>
      </>
    )
  }
  
};

export default Groups;
