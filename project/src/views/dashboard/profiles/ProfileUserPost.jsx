import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import Card from "../../../components/Card";
import CustomToggle from "../../../components/dropdowns";
import ReactFsLightbox from "fslightbox-react";
import { UpdateExperience, UpdateProfile, UpdateStudyCarrier,UpdateSkill,UpdateCertificate } from "../../../api/auth.js";
import imgp1 from "../../../assets/images/user/15.jpg";

import imgp25 from "../../../assets/images/user/1.jpg";
import imgp26 from "../../../assets/images/user/02.jpg";
import imgp27 from "../../../assets/images/user/05.jpg";
import imgp28 from "../../../assets/images/user/06.jpg";
import imgp29 from "../../../assets/images/user/07.jpg";
import imgp30 from "../../../assets/images/user/08.jpg";
import imgp31 from "../../../assets/images/user/02.jpg";
import imgp36 from "../../../assets/images/user/02.jpg";
import imgp42 from "../../../assets/images/user/02.jpg";
import imgp43 from "../../../assets/images/user/02.jpg";
import imgp44 from "../../../assets/images/user/02.jpg";
import imgp45 from "../../../assets/images/user/02.jpg";
import imgp46 from "../../../assets/images/user/02.jpg";
import imgp47 from "../../../assets/images/page-img/52.jpg";
import imgp48 from "../../../assets/images/page-img/53.jpg";
import imgp49 from "../../../assets/images/page-img/54.jpg";
import imgp50 from "../../../assets/images/page-img/55.jpg";
import ProfileHeader from "../../../components/profile-header";
import bg3 from "../../../assets/images/page-img/profile-bg3.jpg";
import g1 from "../../../assets/images/page-img/g1.jpg";
import g2 from "../../../assets/images/page-img/g2.jpg";
import g3 from "../../../assets/images/page-img/g3.jpg";
import g4 from "../../../assets/images/page-img/g4.jpg";
import g5 from "../../../assets/images/page-img/g5.jpg";
import g6 from "../../../assets/images/page-img/g6.jpg";
import g7 from "../../../assets/images/page-img/g7.jpg";
import g8 from "../../../assets/images/page-img/g8.jpg";
import g9 from "../../../assets/images/page-img/g9.jpg";
import user9 from "../../../assets/images/user/1.jpg";
import small1 from "../../../assets/images/small/07.png";
import small2 from "../../../assets/images/small/08.png";
import small3 from "../../../assets/images/small/09.png";
import small4 from "../../../assets/images/small/10.png";
import small5 from "../../../assets/images/small/11.png";
import small6 from "../../../assets/images/small/12.png";
import small7 from "../../../assets/images/small/13.png";
import small8 from "../../../assets/images/small/14.png";
import img1 from "../../../assets/images/small/07.png";
import user1 from "../../../assets/images/user/1.jpg";
import small07 from "../../../assets/images/small/07.png";
import small08 from "../../../assets/images/small/08.png";
import small09 from "../../../assets/images/small/09.png";
import { updatePicture ,updateProfilePicture,updateCv} from "../../../api/auth.js";
import PostUserProfile from "./PostUserProfile";
import {UilTimes} from '@iconscout/react-unicons'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../../actions/uploadAction";
import axios from "axios";
// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

const ProfileUserPost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);
  const [show9, setShow9] = useState(false);
  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  


  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  function imageOnSlide(number) {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  }

  const [expert, setExpert] = useState(false);
  const [company, setCompany] = useState(false);
  const [visiteur, setVisiteur] = useState(false);

  const [picture,setPicture]=useState("");
  const [coverPhoto,setCoverPhoto]=useState("");
  const [cv,setCv]=useState("");

  const[fullname, setFullname] = useState('');
  const[experience, setExperience] = useState('');
  const[studyCarrier, setStudyCarrier] = useState('');
  const[skill, setSkill] = useState('');
  const[certificate, setCertificate] = useState('');
 
  const User = JSON.parse(localStorage.getItem("myData"));
  const loading = useSelector((state)=>state.uploading)
  const imageRef = useRef();
  const desc = useRef();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch()
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage( img);
    }
  };
  const reset =()=>{
    setImage(null)
    desc.current.value=""
  }
  const handleSubmitPost =(e) =>{
    e.preventDefault()
    const newPost ={
      userId : User.user._id,
      fullName : User.user.fullName,
      desc :desc.current.value,
      image
    }
    
    dispatch(uploadPost(newPost))
    reset()

  }


  





 // Récupérez les données de l'utilisateur à partir de localStorage
 const userr = JSON.parse(localStorage.getItem('myData')).user;
 console.log("userProfile",userr);

  


  const buttonsModals = (visiteur) => {
    switch (visiteur) {
      case true:
        return (
          <Button
            className="me-2 mt-2 btn btn-primary ms-2 btn-sm d-flex align-items-center"
            onClick={() => setVisiteur(!visiteur)}
          >
            Show Profession Profile
          </Button>
        );
      default:
        return (
          <div>
            <Button
              className="me-2 mt-2 btn btn-primary ms-2 btn-sm d-flex align-items-center"
              onClick={() => setVisiteur(!visiteur)}
            >
              Show Profession Profile
            </Button>
            <Button
              className="me-2 mt-2 btn btn-primary ms-2 btn-sm d-flex align-items-center"
              onClick={handleShow6}
            >
              <span className="material-symbols-outlined  md-16">add</span>
              add new experience
            </Button>
            <Modal centered show={show6} onHide={handleClose6}>
              <Form onSubmit={handleSubmitExperience}> 
                <Modal.Header closeButton>
                  <Modal.Title>New Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                      The Company                       </Form.Label>
                      <Form.Control
                        type="text"
                        id="validationDefault01"
                        name="company"
                        required
                        onChange={handleChangeExperience}
                      />
                    </Col>
                    <Col md="6" className="mb-3">
                      <Form.Group className="form-group">
                        <Form.Label>Post</Form.Label>
                        <Form.Control type="text" required name="poste"  onChange={handleChangeExperience} />
                      </Form.Group>
                    </Col>
                   
                    <Col md="6" className="mb-3">
                      <Form.Group className="form-group">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" defaultValue="2019-12-18" name="startDate"   onChange={handleChangeExperience}/>
                      </Form.Group>
                    </Col>

                    <Col md="6" className="mb-3">
                      <Form.Group className="form-group">
                        <Form.Label>End Date </Form.Label>
                        <Form.Control type="date" defaultValue="2019-12-18" name="endDate"   onChange={handleChangeExperience} />
                      </Form.Group>
                    </Col>
                  </Row>
                
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose6}>
                    Close
                  </Button>
                  <Button variant="primary"  type ="submit">
                    Add new Experience
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        );
    }
  };

  const [updateProfile, setUpdateProfile] = useState(false);

  const [data, setData] = useState();
  
  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem("myData")).user.id;
      UpdateProfile(userId, data);
    } catch (error) {
      console.log(error);
    }
  };
const handleChangeExperience= (e) => {
  setExperience({ ...experience, [e.target.name]: e.target.value });
  console.log(experience);
};

const handleSubmitExperience = (e) => {
  e.preventDefault();
  try {
    const userId = JSON.parse(localStorage.getItem("myData")).user.id;
    UpdateExperience(experience);
    handleClose6();
  } catch (error) {
    console.log(error);
  }
};

const handleChangeStudyCarrier= (e) => {
  setStudyCarrier({ ...studyCarrier, [e.target.name]: e.target.value });
  console.log(studyCarrier);
};
const handleSubmitStudyCarrier = (e) => {
  e.preventDefault();
  try {
    const userId = JSON.parse(localStorage.getItem("myData")).user.id;
    UpdateStudyCarrier(studyCarrier);
    handleClose9();
  } catch (error) {
    console.log(error);
  }
};

const handleChangeSkill= (e) => {
  setSkill({ ...skill, [e.target.name]: e.target.value });
  console.log(skill);
};
const handleSubmitSkill = (e) => {
  e.preventDefault();
  try {
    const userId = JSON.parse(localStorage.getItem("myData")).user.id;
    UpdateSkill(skill);
    handleClose8();
  } catch (error) {
    console.log(error);
  }
};

const handleSubmitCertificate = (e) => {
  e.preventDefault();
  try {
    const userId = JSON.parse(localStorage.getItem("myData")).user.id;
    UpdateCertificate(certificate);
    handleClose7();
  } catch (error) {
    console.log(error);
  }
};
const handleChangeCertificate= (e) => {
  setCertificate({ ...certificate, [e.target.name]: e.target.value });
  console.log(certificate);
};

  const handleSubmitPicture= (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('picture',picture);
    console.log(form);
    try {
      const userId = JSON.parse(localStorage.getItem("myData")).user.id;
      updatePicture(form);
    } catch (error) {
      console.log(error);
    }

  };
  




  const handleSubmitProfilePicture= (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('coverPhoto',coverPhoto);
    console.log(form);
    try {
      const userId = JSON.parse(localStorage.getItem("myData")).user.id;
      updateProfilePicture(form);
    } catch (error) {
      console.log(error);
    }

  };
  

//console.log("totlikes",totalLikes)
  const handleSubmitCv= (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('cv',cv);
    console.log(form);
    try {
      const userId = JSON.parse(localStorage.getItem("myData")).user.id;
      updateCv(form);
    } catch (error) {
      console.log(error);
    }

  };
  const [user, setUser] = useState([]);

  const {userId} = useParams()
  useEffect(() => {
  const fetchUserPost = async () => {
    try {
      
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/post/users/${userId}`
      );
      setUser(res.data.user);
      console.log("userrr" , user)
    } catch (err) {
      console.error(err);
    }
  };
  fetchUserPost();
  }, [userId]);

console.log("userrrrrrPost",user)
  return (
    <>
      <FsLightbox
        toggler={imageController.toggler}
        sources={[g1, g2, g3, g4, g5, g6, g7, g8, g9]}
        slide={imageController.slide}
      />
      <ProfileHeader  img={`http://localhost:9000/data/${user.picture}`} />
      <div className="profile-2">
        <div id="content-page" className="content-page">
          <Container>
            <Row>
              <Col lg="12">
                <Card>
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col lg="2">
                        <div className="item1 ms-1 mb-2 text-center">
                          <img
                            loading="lazy"
                            src={`http://localhost:9000/data/${user.coverPhoto}`}
                            className="img-fluid rounded profile-image "
                            alt="profile-img "
                          />
                        </div>
                      </Col>
                      <Col lg="10">
                        <div className="d-flex justify-content-between">
                          <div className="item2 ">
                          {/* {user ? user.map((user) => ( */}
                            <h4 className="">{user.fullName}</h4>
                          {/* )) : null} */}
                          </div>
                          
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header className="d-flex justify-content-between">
                      <h5 className="modal-title" id="post-modalLabel">
                        Create Post
                      </h5>
                      <Link className="lh-1" to="#" onClick={handleClose}>
                        <span className="material-symbols-outlined">close</span>
                      </Link>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="d-flex align-items-center">
                        <div className="user-img">
                          <img
                            loading="lazy"
                            src={user9}
                            alt="userimg"
                            className="avatar-60 rounded-circle img-fluid"
                          />
                        </div>
                        <form className="post-text ms-3 w-100 ">
                          <input
                            type="text"
                            className="form-control rounded"
                            placeholder="Write something here..."
                            style={{ border: "none" }}
                          />
                        </form>
                      </div>
                      <hr />
                      <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small1}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Photo/Video
                          </div>
                        </li>
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small2}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Tag Friend
                          </div>
                        </li>
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small3}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Feeling/Activity
                          </div>
                        </li>
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small4}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Check in
                          </div>
                        </li>
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small5}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Live Video
                          </div>
                        </li>
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small6}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Gif
                          </div>
                        </li>
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small7}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Watch Party
                          </div>
                        </li>
                        <li className="col-md-6 mb-3">
                          <div className="bg-soft-primary rounded p-2 pointer me-3">
                            <Link to="#"></Link>
                            <img
                              loading="lazy"
                              src={small8}
                              alt="icon"
                              className="img-fluid"
                            />{" "}
                            Play with Friends
                          </div>
                        </li>
                      </ul>
                      <hr />
                      <div className="other-option">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="user-img me-3">
                              <img
                                loading="lazy"
                                src={user9}
                                alt="userimg"
                                className="avatar-60 rounded-circle img-fluid"
                              />
                            </div>
                            <h6>Your Story</h6>
                          </div>
                          <div className="card-post-toolbar">
                            <Dropdown>
                              <Dropdown.Toggle
                                className="dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                role="button"
                              >
                                <span className="btn btn-primary">Friend</span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu clemassName="dropdown-menu m-0 p-0">
                                <Dropdown.Item
                                  className="dropdown-item p-3"
                                  href="#"
                                >
                                  <div className="d-flex align-items-top">
                                    <i className="ri-save-line h4"></i>
                                    <div className="data ms-2">
                                      <h6>Public</h6>
                                      <p className="mb-0">
                                        Anyone on or off Facebook
                                      </p>
                                    </div>
                                  </div>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="dropdown-item p-3"
                                  href="#"
                                >
                                  <div className="d-flex align-items-top">
                                    <i className="ri-close-circle-line h4"></i>
                                    <div className="data ms-2">
                                      <h6>Friends</h6>
                                      <p className="mb-0">
                                        Your Friend on facebook
                                      </p>
                                    </div>
                                  </div>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="dropdown-item p-3"
                                  href="#"
                                >
                                  <div className="d-flex align-items-top">
                                    <i className="ri-user-unfollow-line h4"></i>
                                    <div className="data ms-2">
                                      <h6>Friends except</h6>
                                      <p className="mb-0">
                                        Don't show to some friends
                                      </p>
                                    </div>
                                  </div>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="dropdown-item p-3"
                                  href="#"
                                >
                                  <div className="d-flex align-items-top">
                                    <i className="ri-notification-line h4"></i>
                                    <div className="data ms-2">
                                      <h6>Only Me</h6>
                                      <p className="mb-0">Only me</p>
                                    </div>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                      <Button variant="primary" className="d-block w-100 mt-3">
                        Post
                      </Button>
                    </Modal.Body>
                  </Modal>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <Card>
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Profile</h4>
                    </div>
                    
                  </div>
                  <Card.Body>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="mb-2">
                        <span>{user.fullName}</span>
                      </div>
                      <div>
                        <span>{user.email}</span>
                      </div>
                      <div>
                        <span>@nextmodels</span>
                      </div>
                      <div>
                        <span>@munichmodels</span>
                      </div>
                      <div>
                        <span>@elite_copenenhagen</span>
                      </div>
                      <div className="mt-2">
                        <span>been unpredictable since childhood</span>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex flex-column justify-content-between">
                      <div>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          width="18px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                          ></path>
                        </svg>
                        <Link to="#" className="link-primary">
                          Model at next model management
                        </Link>
                      </div>
                      <div>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          width="18px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          ></path>
                        </svg>
                        <span>
                          Studies public relations at{" "}
                          <Link to="#" className="link-primary ">
                            Cacucasus University
                          </Link>
                        </span>
                      </div>
                      <div>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          width="18px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          ></path>
                        </svg>
                        <span>Born on October 9, 2000</span>
                      </div>
                      <div>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          width="18px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          ></path>
                        </svg>
                        <span>
                          Lives in{" "}
                          <Link to="#" className="link-primary ">
                            {user.city}
                          </Link>
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {!updateProfile ? (
                <Col lg="8">
                  
                  <div className="card-2">
                    <Card.Body>
                      <ul className="post-comments p-0 m-0">
                        <li className="">
                          <div className="d-flex justify-content-between">
                            <div className="user-img">
                              <img
                                loading="lazy"
                                src={imgp25}
                                alt="userimg"
                                className="avatar-60 me-3 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="w-100">
                              <form className="post-text mt-2">
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Write something here..."
                                  style={{ border: "none" }}
                                />
                              </form>
                              <hr />
                              <div className="d-flex justify-content-between">
                                <div className="">Add:</div>
                                <div className="">
                                  <svg
                                    fill="none"
                                    width="18px"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                </div>
                                <div className="">
                                  <svg
                                    fill="none"
                                    width="18px"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                </div>
                                <div className="">
                                  <svg
                                    fill="none"
                                    width="18px"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                                    ></path>
                                  </svg>
                                </div>
                                <button className="btn btn-primary btn-sm">
                                  Publish
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Card.Body>
                  </div>
                  <Card>
                  <PostUserProfile picture={user.picture}/>
                    {/* <Card.Body>
                      <ul className="post-comments p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex justify-content-between">
                            <div className="user-img">
                              <img
                                loading="lazy"
                                src={imgp26}
                                alt="userimg"
                                className="avatar-60 me-3 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="w-100 text-margin">
                              <h5>Mathilda Gvarliana</h5>
                              <small className=" d-flex align-items-center ">
                                <i className="material-symbols-outlined md-14 me-1">
                                  schedule
                                </i>
                                March 14, 23:00
                              </small>
                              <p>
                                Hi, I am flying to Los Angeles to attend
                                #VSFS2020 castings. I hope it will happen and my
                                dream comes true. Wish me luck.
                              </p>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center me-3">
                                    <span className="material-symbols-outlined md-18">
                                      favorite_border
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Love it
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center me-3">
                                    <span className="material-symbols-outlined md-18">
                                      comment
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Comment
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <span className="material-symbols-outlined md-18">
                                      share
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Share
                                    </span>
                                  </div>
                                </div>
                                <span className="card-text-2">
                                  5.2k people love it
                                </span>

                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="card-text-1 me-1">
                                    5.2k people love it
                                  </span>
                                  <div className="iq-media-group ms-2">
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp27}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp28}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp29}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp30}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <form
                                className="d-flex align-items-center mt-3"
                                action="#"
                              >
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Write your comment"
                                />
                                <div className="comment-attagement d-flex align-items-center me-4">
                                  <span className="material-symbols-outlined md-18 me-1">
                                    comment
                                  </span>
                                  <h6 className="card-text-1">Comment</h6>
                                </div>
                              </form>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <ul className="post-comments p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex justify-content-between">
                            <div className="user-img">
                              <img
                                loading="lazy"
                                src={imgp31}
                                alt="userimg"
                                className="avatar-60 me-3 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="w-100 text-margin">
                              <h5>Mathilda Gvarliana</h5>
                              <small className=" d-flex align-items-center ">
                                <i className="material-symbols-outlined md-14 me-1">
                                  schedule
                                </i>
                                March 14, 23:00
                              </small>
                              <div className="mt-2 mb-2 ratio">
                                <iframe
                                  title="myFrame"
                                  className="rounded embed-responsive-item"
                                  src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <p>Dolce Spring Summer 2020 - Women's Show</p>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center me-3">
                                    <span className="material-symbols-outlined md-18">
                                      favorite_border
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Love it
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center me-3">
                                    <span className="material-symbols-outlined md-18">
                                      comment
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Comment
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <span className="material-symbols-outlined md-18">
                                      share
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Share
                                    </span>
                                  </div>
                                </div>
                                <span className="card-text-2">
                                  5.2k people love it
                                </span>

                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="card-text-1 me-1">
                                    5.2k people love it
                                  </span>
                                  <div className="iq-media-group ms-2">
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp27}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp28}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp29}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp30}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <form
                                className="d-flex align-items-center mt-3"
                                action="#"
                              >
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Write your comment"
                                />
                                <div className="comment-attagement d-flex align-items-center me-4">
                                  <span className="material-symbols-outlined md-18 me-1">
                                    comment
                                  </span>
                                  <h6 className="card-text-1">Comment</h6>
                                </div>
                              </form>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <ul className="post-comments p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex justify-content-between">
                            <div className="user-img">
                              <img
                                loading="lazy"
                                src={imgp36}
                                alt="userimg"
                                className="avatar-60 me-3 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="w-100 text-margin">
                              <h5>Mathilda Gvarliana</h5>
                              <small className=" d-flex align-items-center ">
                                {" "}
                                <i className="material-symbols-outlined md-14 me-1">
                                  schedule
                                </i>{" "}
                                March 14, 23:00
                              </small>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.{" "}
                              </p>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center me-3">
                                    <span className="material-symbols-outlined md-18">
                                      favorite_border
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Love it
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center me-3">
                                    <span className="material-symbols-outlined md-18">
                                      comment
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Comment
                                    </span>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <span className="material-symbols-outlined md-18">
                                      share
                                    </span>
                                    <span className="card-text-1 ms-1">
                                      Share
                                    </span>
                                  </div>
                                </div>
                                <span className="card-text-2">
                                  5.2k people love it
                                </span>

                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="card-text-1 me-1">
                                    5.2k people love it
                                  </span>
                                  <div className="iq-media-group ms-2">
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp27}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp28}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp29}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp30}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center mt-4">
                                <p>Hide 203 comments</p>
                              </div>
                              <ul className="post-comments p-2  card rounded">
                                <li className="mb-2">
                                  <div className="d-flex justify-content-between">
                                    <div className="user-img">
                                      <img
                                        src={imgp45}
                                        alt="userimg"
                                        className="avatar-60 me-3 rounded-circle img-fluid"
                                      />
                                    </div>
                                    <div className="w-100 text-margin">
                                      <div className="">
                                        <h5 className="mb-0 d-inline-block me-1">
                                          Emma Labelle
                                        </h5>
                                        <h6 className=" mb-0 d-inline-block">
                                          2 weeks ago
                                        </h6>
                                      </div>
                                      <p>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry.{" "}
                                      </p>
                                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div className="d-flex align-items-center me-3">
                                            <span className="material-symbols-outlined md-18">
                                              favorite_border
                                            </span>
                                            <span className="card-text-1 ms-1">
                                              Love it
                                            </span>
                                          </div>
                                          <div className="d-flex align-items-center me-3">
                                            <span className="material-symbols-outlined md-18">
                                              comment
                                            </span>
                                            <span className="card-text-1 ms-1">
                                              Comment
                                            </span>
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <span className="material-symbols-outlined md-18">
                                              share
                                            </span>
                                            <span className="card-text-1 ms-1">
                                              Share
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="post-comments p-2 m-0 bg-soft-light text-dark">
                                <li className="mb-2">
                                  <div className="d-flex justify-content-between">
                                    <div className="user-img">
                                      <img
                                        loading="lazy"
                                        src={imgp42}
                                        alt="userimg"
                                        className="avatar-60 me-3 rounded-circle img-fluid"
                                      />
                                    </div>
                                    <div className="w-100 text-margin">
                                      <div className="">
                                        <h5 className="mb-0 d-inline-block me-1">
                                          Emma Labelle
                                        </h5>
                                        <span className=" mb-0 d-inline-block">
                                          2 weeks ago
                                        </span>
                                      </div>
                                      <p>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s
                                      </p>
                                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="d-flex justify-content-around align-items-center">
                                          <div className="d-flex align-items-center me-3">
                                            <span className="material-symbols-outlined md-18">
                                              favorite_border
                                            </span>
                                            <span className="card-text-1 ms-1">
                                              Love it
                                            </span>
                                          </div>
                                          <div className="d-flex align-items-center me-3">
                                            <span className="material-symbols-outlined md-18">
                                              comment
                                            </span>
                                            <span className="card-text-1 ms-1">
                                              Comment
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <ul className="post-comments p-0 mt-4 text-dark">
                                        <li className="mb-2">
                                          <div className="d-flex justify-content-between">
                                            <div className="user-img">
                                              <img
                                                loading="lazy"
                                                src={imgp43}
                                                alt="userimg"
                                                className="avatar-60 me-3 rounded-circle img-fluid avatar-1"
                                              />
                                            </div>
                                            <div className="w-100 text-margin">
                                              <div className="">
                                                <h5 className="mb-0 d-inline-block me-1">
                                                  Emma Labelle
                                                </h5>
                                                <h6 className=" mb-0 d-inline-block">
                                                  2 weeks ago
                                                </h6>
                                              </div>
                                              <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry. Lorem Ipsum has been
                                                the industry's standard dummy
                                                text ever since the 1500s.
                                              </p>
                                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="d-flex justify-content-around align-items-center">
                                                  <div className="d-flex align-items-center me-3">
                                                    <span className="material-symbols-outlined md-18">
                                                      favorite_border
                                                    </span>
                                                    <span className="card-text-1 ms-1">
                                                      Love it
                                                    </span>
                                                  </div>
                                                  <div className="d-flex align-items-center me-3">
                                                    <span className="material-symbols-outlined md-18">
                                                      comment
                                                    </span>
                                                    <span className="card-text-1 ms-1">
                                                      Comment
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                      <ul className="post-comments p-0 mt-4 text-dark">
                                        <li className="mb-2">
                                          <div className="d-flex justify-content-between">
                                            <div className="user-img">
                                              <img
                                                loading="lazy"
                                                src={imgp44}
                                                alt="userimg"
                                                className="avatar-60 me-3 rounded-circle img-fluid avatar-1"
                                              />
                                            </div>
                                            <div className="w-100 text-margin">
                                              <div className="">
                                                <h5 className="mb-0 d-inline-block me-1">
                                                  Emma Labelle
                                                </h5>
                                                <h6 className=" mb-0 d-inline-block">
                                                  2 weeks ago
                                                </h6>
                                              </div>
                                              <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.{" "}
                                              </p>
                                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                <div className="d-flex justify-content-around align-items-center">
                                                  <div className="d-flex align-items-center me-3">
                                                    <span className="material-symbols-outlined md-18">
                                                      favorite_border
                                                    </span>
                                                    <span className="card-text-1 ms-1">
                                                      Love it
                                                    </span>
                                                  </div>
                                                  <div className="d-flex align-items-center me-3">
                                                    <span className="material-symbols-outlined md-18">
                                                      comment
                                                    </span>
                                                    <span className="card-text-1 ms-1">
                                                      Comment
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              <form
                                                className="d-flex align-items-center mt-3"
                                                action="#"
                                              >
                                                <input
                                                  type="text"
                                                  className="form-control rounded"
                                                  placeholder="Write your comment"
                                                />
                                                <div className="comment-attagement d-flex align-items-center me-4">
                                                  <span className="material-symbols-outlined md-18 me-1">
                                                    comment
                                                  </span>
                                                  <h6 className="card-text-1 me-2">
                                                    Comment
                                                  </h6>
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <ul className="post-comments p-2 mt-4 text-dark">
                                <li className="mb-2">
                                  <div className="d-flex justify-content-between">
                                    <div className="user-img">
                                      <img
                                        loading="lazy"
                                        src={imgp45}
                                        alt="userimg"
                                        className="avatar-60 me-3 rounded-circle img-fluid "
                                      />
                                    </div>
                                    <div className="w-100 text-margin">
                                      <div className="">
                                        <h5 className="mb-0 d-inline-block me-1">
                                          Emma Labelle
                                        </h5>
                                        <span className=" mb-0 d-inline-block">
                                          2 weeks ago
                                        </span>
                                      </div>
                                      <p>
                                        Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry.
                                      </p>
                                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="d-flex justify-content-around align-items-center">
                                          <div className="d-flex align-items-center me-3">
                                            <span className="material-symbols-outlined md-18">
                                              favorite_border
                                            </span>
                                            <span className="card-text-1 ms-1">
                                              Love it
                                            </span>
                                          </div>
                                          <div className="d-flex align-items-center me-3">
                                            <span className="material-symbols-outlined md-18">
                                              comment
                                            </span>
                                            <span className="card-text-1 ms-1">
                                              Comment
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <form
                                  className="d-flex align-items-center mt-3"
                                  action="#"
                                >
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Write your comment"
                                  />
                                  <div className="comment-attagement d-flex align-items-center me-4">
                                    <span className="material-symbols-outlined md-18 me-1">
                                      comment
                                    </span>
                                    <h6 className="card-text-1 me-2">
                                      Comment
                                    </h6>
                                  </div>
                                </form>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Card.Body> */}
                  </Card>
                  <Card>
                    {/* <Card.Body>
                      <ul className="post-comments p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex justify-content-between">
                            <div className="user-img">
                              <img
                                loading="lazy"
                                src={imgp46}
                                alt="userimg"
                                className="avatar-60 me-3 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="w-100 text-margin">
                              <h4>Mathilda Gvarliana</h4>
                              <p className="mb-4">June 30, 12: 26</p>
                              <div className="d-grid gap-2 grid-cols-2 mb-2">
                                <Link to="#">
                                  <img
                                    loading="lazy"
                                    src={imgp47}
                                    className="img-fluid bg-soft-info rounded  image-size"
                                    alt="profile-img"
                                  />
                                </Link>
                                <Link to="#">
                                  <img
                                    loading="lazy"
                                    src={imgp48}
                                    className="img-fluid bg-soft-info rounded  image-size"
                                    alt="profile-img"
                                  />
                                </Link>
                                <Link to="#">
                                  <img
                                    loading="lazy"
                                    src={imgp49}
                                    className="img-fluid bg-soft-info rounded  image-size"
                                    alt="profile-img"
                                  />
                                </Link>
                                <Link to="#">
                                  <img
                                    loading="lazy"
                                    src={imgp50}
                                    className="img-fluid bg-soft-info rounded  image-size"
                                    alt="profile-img"
                                  />
                                </Link>
                              </div>
                              <span className="">
                                Photoshoot for Buyers Magazine - 2019
                              </span>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center me-3">
                                      <span className="material-symbols-outlined md-18">
                                        favorite_border
                                      </span>
                                      <span className="card-text-1 ms-1">
                                        Love it
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center me-3">
                                      <span className="material-symbols-outlined md-18">
                                        comment
                                      </span>
                                      <span className="card-text-1 ms-1">
                                        Comment
                                      </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <span className="material-symbols-outlined md-18">
                                        share
                                      </span>
                                      <span className="card-text-1 ms-1">
                                        Share
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="card-text-1 me-1">
                                    5.2k people love it
                                  </span>
                                  <div className="iq-media-group ms-2">
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp27}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp28}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp29}
                                        alt=""
                                      />
                                    </Link>
                                    <Link to="#" className="iq-media ">
                                      <img
                                        loading="lazy"
                                        className="img-fluid avatar-30 rounded-circle"
                                        src={imgp30}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <form
                                className="d-flex align-items-center mt-3"
                                action="#"
                              >
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Write your comment"
                                />
                                <div className="comment-attagement d-flex align-items-center me-4">
                                  <span className="material-symbols-outlined md-18 me-1">
                                    comment
                                  </span>
                                  <h6 className="card-text-1 me-2">Comment</h6>
                                </div>
                              </form>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Card.Body> */}
                  </Card>
                </Col>
              ) : (
                <Col lg="8">
                  <Card>
                    <Card.Header className="d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title">Update Your Profile</h4>
                      </div>

                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={handleSubmitPicture} enctype="multipart/form-data">
                    <Form.Group className="form-group">
                          <Form.Label className="custom-file-input">
                            cover Image :
                          </Form.Label>
                          <Form.Control
                            type="file"
                            id="customFile"
                            name="imgProfile"

                            onChange={(e)=>{setPicture(e.target.files[0])}}
                          

                          />
                        </Form.Group>
                         <Button type="submit" variant="primary">
                          Submit
                        </Button>{" "}
                        <Button variant="danger">Cancel</Button>
                        </Form >


                        <Form onSubmit={handleSubmitProfilePicture} enctype="multipart/form-data">
                    <Form.Group className="form-group">
                          <Form.Label className="custom-file-input">
                            Profile Image :
                          </Form.Label>
                          <Form.Control
                            type="file"
                            id="customFile"
                            name="imgProfile"

                            onChange={(e)=>{setCoverPhoto(e.target.files[0])}}
                          

                          />
                        </Form.Group>
                         <Button type="submit" variant="primary">
                          Submit
                        </Button>{" "}
                        <Button variant="danger">Cancel</Button>
                        </Form >
                        
                      <Form onSubmit={handleSubmit}>
                      
                        <Form.Group className="form-group">
                          <Form.Label>
                            {company ? "Full Name" : "Full Name :"}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user.fullName}
                            placeholder="Enter Name"
                            name="fullName"
                            onChange={handleChange}
                          />

                        </Form.Group>
                        </Form >
                        <Form.Group className="form-group">
                          <Form.Label>
                            {company ? "Birthdate" : " Birthdate :"}
                          </Form.Label>
                          <Form.Control
                            type="date"
                            defaultValue={user.birthDate}
                            
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label>gender :</Form.Label>
                          <Form.Control 
                          as="select"
          
       
                                         >
         
          <option value="male">male</option>
          <option value="female">female</option>
        
        </Form.Control>
                        </Form.Group>
                        <Form.Group className="form-group">
                         
                        </Form.Group>
                        {company ? (
                          <Form.Group className="form-group">
                            <Form.Label>studyCarrier </Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue="https://getbootstrap.com"
                              placeholder="Enter university"
                              onChange={handleChange}
                            />
                          </Form.Group>
                        ) : (
                          ""
                        )}
                        <Form.Group className="form-group">
                         
                        </Form.Group>
                     
                       
                        <Form.Group className="form-group">
                          <Form.Label>Adress :</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user.address}
                            placeholder="Enter Adress"
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label>City :</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user.city}
                            placeholder="Enter City"
                            onChange={handleChange}
                          />
                    
                        </Form.Group>
                        <Form.Group className="form-group">
                          
                          <Form.Check
                            type="checkbox"
                            label="Open To Work "
                   
                          />
                            
                        
                        
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Check
                            type="checkbox"
                            label="Open To Intership "
                          />
                        </Form.Group>
                        {!company ? (
                          <Form.Group className="form-group">
                            
                          </Form.Group>
                        ) : (
                          ""
                        )}


<Button
              className="me-2 mt-2 btn btn-primary ms-2 btn-sm d-flex align-items-center"
              onClick={handleShow9}
            >
              <span className="material-symbols-outlined  md-16">add</span>

           Study carrier
            </Button>
            <Modal centered show={show9} onHide={handleClose9}>
              <Form onSubmit={handleSubmitStudyCarrier}>  
                <Modal.Header closeButton>
                  <Modal.Title>Study carrier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                  <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                      UniversityName                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="validationDefault01"
                        name="university"
                        required
                        onChange={handleChangeStudyCarrier}
                      />
                    </Col>
                    <Col md="6" className="mb-3">
                      <Form.Group className="form-group">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" required name="startDate"   onChange={handleChangeStudyCarrier}/>
                      </Form.Group>
                    </Col>
                    <Col md="6" className="mb-3">
                      <Form.Group className="form-group">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" required name="endDate"   onChange={handleChangeStudyCarrier} />
                      </Form.Group>
                    </Col>

                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose9}>
                    Close
                  </Button>
                  <Button variant="primary"  type ="submit">
                    Add an other etablishement 
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>






         <Button
              className="me-2 mt-2 btn btn-primary ms-2 btn-sm d-flex align-items-center"
              onClick={handleShow7}
            >
              <span className="material-symbols-outlined  md-16">add</span>

           add new certificate
            </Button>
            <Modal centered show={show7} onHide={handleClose7}>
              <Form onSubmit={handleSubmitCertificate} enctype="multipart/form-data">
                <Modal.Header closeButton>
                  <Modal.Title>New certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                      Name                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="validationDefault01"
                        name="name"
                        required
                        onChange={handleChangeCertificate}
                      />
                    </Col>
                    <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                      company                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="validationDefault01"
                        required
                        name="company"
                        onChange={handleChangeCertificate}
                      />
                    </Col>
                   
                    <Col md="6" className="mb-3">
                      <Form.Group className="form-group">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" drequired name="date"    onChange={handleChangeCertificate} />
                      </Form.Group>
                    </Col>
                    <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                      upload your certificate                      </Form.Label>
                      <Form.Control
                         type="file"
                         id="customFile"
                        required
                        name="file"
                        onChange={(e)=>{setCertificate({...certificate,certificate:e.target.files[0]})}}
                      />
                       </Col>
                       <Col md="6" className="mb-3">
                      <Form.Label md="6" htmlFor="validationDefault01">
                      url                       </Form.Label>
                      <Form.Control
                        type="url"
                        id="validationDefault01"
                        name="url"
                        onChange={handleChangeCertificate}
                      />
                    </Col>
                    


                   
                         
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose7}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add new Certificate
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>



            <Button
              className="me-2 mt-2 btn btn-primary ms-2 btn-sm d-flex align-items-center"
              onClick={handleShow8}
            >
              <span className="material-symbols-outlined  md-16">add</span>
 
           add new Skill
            </Button>
            <Modal centered show={show8} onHide={handleClose8}>
               <Form onSubmit={handleSubmitSkill}> 
                <Modal.Header closeButton>
                  <Modal.Title>New Skill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                  <Col md="6" className="mb-3">
  <Form.Label md="6" htmlFor="skillName">
    Nom de compétence
  </Form.Label>
  <Form.Control
    as="select"
    id="skillName"
    name="name"
    required
    onChange={handleChangeSkill}
  >
    <option value="">Choisissez une compétence</option>
    <option value="HTML">HTML</option>
    <option value="CSS">CSS</option>
    <option value="JavaScript">JavaScript</option>
    <option value="Python">Python</option>
    <option value="SQL">SQL</option>
    // Ajoutez d'autres options de compétences si nécessaire
    
  </Form.Control >
</Col>

<Col md="6" className="mb-3">
  <Form.Label md="6" htmlFor="skillLevel">
    Niveau de compétence
  </Form.Label>
  <Form.Control
    as="select"
    id="skillLevel"
    name="level"
    required
    onChange={handleChangeSkill}
  >
    <option value="">Choisissez un niveau</option>
    <option value="beginner">beginner</option>
    <option value="intermediate">intermediate</option>
    <option value="advanced">advanced</option>
  </Form.Control>
</Col>


         
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose8}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add new Skill
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>


                        <Form onSubmit={handleSubmitCv} enctype="multipart/form-data">
                        <Form.Group className="form-group">
                          <Form.Label className="custom-file-input">
                            {company
                              ? "Register commerce :"
                              : expert
                              ? "Cerificat expertise :"
                              : "Your CV :"}
                          </Form.Label>
                          <Form.Control
                            type="file"
                            id="customFile"
                            name="docs"
                            onChange={(e)=>{setCv(e.target.files[0])}}
                          />
            
                        </Form.Group>
                        
                        
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>{" "}
                        <Button variant="danger">Cancel</Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default ProfileUserPost;
