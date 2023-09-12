import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import imgpost from "../../assets/images/16620273397236.jpg"
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import CustomToggle from "../../components/dropdowns";
import ShareOffcanvas from "../../components/share-offcanvas";
import "../dashboard/Post/Post.css"


//image
import user1 from "../../assets/images/user/1.jpg";
import user01 from "../../assets/images/user/01.jpg";
import user2 from "../../assets/images/user/02.jpg";
import user3 from "../../assets/images/user/03.jpg";
// import user4 from "../../assets/images/user/04.jpg";
import img1 from "../../assets/images/small/07.png";
// import img2 from "../../assets/images/small/08.png";
// import img3 from "../../assets/images/small/09.png";
// import img4 from "../../assets/images/small/10.png";
// import img5 from "../../assets/images/small/11.png";
// import img6 from "../../assets/images/small/12.png";
// import img7 from "../../assets/images/small/13.png";
// import img8 from "../../assets/images/small/14.png";
import p1 from "../../assets/images/page-img/p1.jpg";
// import s1 from "../../assets/images/page-img/s1.jpg";
// import s2 from "../../assets/images/page-img/s2.jpg";
// import s3 from "../../assets/images/page-img/s3.jpg";
// import s4 from "../../assets/images/page-img/s4.jpg";
// import s5 from "../../assets/images/page-img/s5.jpg";
import p2 from "../../assets/images/page-img/p2.jpg";
import p3 from "../../assets/images/page-img/p3.jpg";
// import p4 from "../../assets/images/page-img/p4.jpg";
// import p5 from "../../assets/images/page-img/p5.jpg";
// import img42 from "../../assets/images/page-img/42.png";
import icon1 from "../../assets/images/icon/01.png";
import icon2 from "../../assets/images/icon/02.png";
import icon3 from "../../assets/images/icon/03.png";
import icon4 from "../../assets/images/icon/04.png";
import icon5 from "../../assets/images/icon/05.png";
import icon6 from "../../assets/images/icon/06.png";
import icon7 from "../../assets/images/icon/07.png";
// import img9 from "../../assets/images/small/img-1.jpg";
// import img10 from "../../assets/images/small/img-2.jpg";
import loader from "../../assets/images/page-img/page-load-loader.gif";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
import {UilTimes} from '@iconscout/react-unicons'
import axios from "axios";
import jwt from "jwt-decode";
import emailjs from '@emailjs/browser';

const Postes = () => {
  
  const [selectedPost, setSelectedPost] = useState({});
  const [posts, setPosts] = useState([]);
  const token = JSON.parse(localStorage.getItem("myData")).token;
  const User = JSON.parse(localStorage.getItem("myData"));
  const [likes, setLikes] = useState(posts.likes);
  const [imagee, setImagee] = useState([])
  
  const [user, setUser] = useState(null);
const [isLiked, setIsLiked] = useState(false);
const userpicture = JSON.parse(localStorage.getItem("myData")).user.picture;
	const getUserByID = () => {
		if (token !== null) {
			const decoded_token = jwt(token);
			console.log(decoded_token);
			return decoded_token.id;
		}
	};
	const userId = getUserByID();
  

  const fetchUser = async (userId =User.user._id) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/post/user/${userId}`
			);
			setUser(response.data);
		} catch (err) {
			setError(err.message);
		}
	};
  //fetchUser(posts.data)
  console.log("this is user fetching", User)
  
  console.log("this is TOKEN",token)
  console.log( "this is id", User.user._id)

  const fetchData = async () => {
    try {
      
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/`);
      setPosts(res.data.posts);
      setImagee(res.data.data.posts.image)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  const handleDelete = async (postId, userId = User.user._id) => {
    try {
      const ID = userId;
      console.log("delete id ", ID);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
        {
          data: { userId: ID },
        }
      );
      if (response.status === 200) {
        alert("Post deleted");
        window.location.reload();
      } else {
        alert("Problem with the deletion of the POST");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, []);
  console.log("image list",imagee)

//64332d9a2874923de3c456ba

	const handleLike = async (postId) => {
    const userId =User.user._id
		try {
			const res = await axios.put(
				`${process.env.REACT_APP_API_URL}/post/${postId}/like`, {userId}
			);
			setLikes({ likes: res.data });
			isLiked  ? setIsLiked(false) : setIsLiked(true);
      setLikes({ status: isLiked });
      window.location.reload()
		} catch (err) {
			console.log(`error with like post ${err}`);
		}

	};

  const deleteComment = async (postId, commentId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/post/${postId}/comment/${commentId}`
      );
      if (res.data.message === "Comment deleted successfully") {
        alert("Comment deleted successfully");
        window.location.reload();
      } else {
        alert("Failed to delete comment");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(likes)
const [comment,setComment] = useState()
  const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const [error, setError] = useState(null);
	// Fetch all comments on component mount
	useEffect(() => {
		const fetchComments = async (postId) => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/post/${postId}/comments`
				);
				setComments({data : response.data.comments});
			} catch (error) {
				console.error(error);
				setError('Failed to fetch comments');
			}
		};
		fetchComments();
	}, []);
  console.log(posts)
  console.log("comments",comments)
  const handleAddComment = async (postId) => {
    console.log("postId is :",postId)
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/post/${postId}/comment`,
				{
					user: User.user._id,
					fullName: User.user.fullName,
					comment: newComment,
				}
			);
      
			setComments([...comments, response.data.comment]);
      setPosts(posts.map(post => post._id === postId ? response.data : post));
			setNewComment('');
      window.location.reload()
		} catch (error) {
			console.error(error);
			setError('Failed to add comment');
		}
	};
  
	console.log(comments)

  const loading = useSelector((state)=>state.uploading)
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const fullName = useRef();
  const dispatch = useDispatch()
  const [loadingp, setLoadingp] = useState(false);

const [message, setMessage] = useState('');
const [signaled, setSignaled] = useState(false);
  const signalPost = async (postId) => {
    try {
      const userId = User.user._id
      setLoadingp(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/post/${postId}/user/${userId}`
      );
      setMessage(response.data.message);
      message === 'Post signaled successfully.' && alert(message);
      const signaled = response.data.signaled;
console.log(signaled)
		if (signaled) {
			emailjs
				.send(
					'service_yed2f4f',
			    'template_u3wfja9',
					{
            subject:"Signaled Post!",
						from_name: User.user.fullName,
						to_name: 'israa neji',
						from_email: User.user.email,
						to_email: 'israa.neji8@gmail.com',
						message: `A post with ID ${postId} has been signaled by user ${userId}.`,
					},
					'Is3m-Kd7A8xCMlCr6'
				)
				.then(
					() => {
						setLoadingp(false);
					},
					(error) => {
						setLoadingp(false);
						console.error(error);
					}
				);
		}
    } catch (err) {
      console.error(err);
      setMessage('Error signaling post.');
      setLoadingp(false);
      alert('Ahh, something went wrong. Please try again.');
    }
  };
  

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
  const handleSubmit =(e) =>{
    e.preventDefault()
    const newPost ={
      userId : User.user._id,
      fullName : User.user.fullName,
      desc :desc.current.value,
      image
    }
    
    dispatch(uploadPost(newPost))
    reset()
    fetchData()

  }





  return (
    <>
      <div id="content-page" className="content-page ">
        <Container>
        
          <Row className="justify-content-center">
          <div className="raison" >4 bonnes raisons de choisir Workhub !</div>
            <Col lg={8} className="row m-0 p-0 w-auto">
            
              <Col sm={12}>
                <Card
                  id="post-modal-data"
                 
                >
                  
                  
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h2 className="card-title sousraison s2">
                      Apprentissage
personnalisé </h2>
                                    <h4> 
Il progresse à son rythme. La difficulté des exercices s’ajuste à son niveau.</h4>

                    </div>
                  </div>
                  
                </Card>
                <Card
                  id="post-modal-data"
                 
                >
                  
                  
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                                  
            <h2 className="card-title sousraison s1" >
            Suivi
            des progrès</h2>
                                                <h4> 
            Accédez en un clic, en temps réel, à tous les progrès de votre enfant.</h4>
                    </div>
                  </div>
                  
                </Card>
                <Card
                  id="post-modal-data"
                 
                >
                  
                  
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                                  
            <h2 className="card-title sousraison s3" >
            Accès
illimité</h2>
                                                <h4> 
                                                
Votre enfant a accès à tous les exercices de maths de la maternelle à la sixième.</h4>
                    </div>
                  </div>
                  
                </Card>
              </Col>

             
              
            </Col>

            
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Postes;
