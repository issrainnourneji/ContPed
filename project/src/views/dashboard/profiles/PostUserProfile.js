import axios from "axios";
import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import ShareOffcanvas from "../../../components/share-offcanvas";
import { Link, useParams } from "react-router-dom";
import icon2 from "../../../assets/images/icon/02.png";

import imgpost from "../../../assets/images/16620273397236.jpg";
import user3 from "../../../assets/images/user/03.jpg";
import CustomToggle from "../../../components/dropdowns";
import emailjs from '@emailjs/browser';
function PostUserProfile({picture}) {
  const [allPosts, setAllPosts] = useState([]);
  const User = JSON.parse(localStorage.getItem("myData"));
  const token = JSON.parse(localStorage.getItem("myData")).token;
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(posts.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [loadingp, setLoadingp] = useState(false);
  const [message, setMessage] = useState('');
  const userpicture = JSON.parse(localStorage.getItem("myData")).user.picture;
  // Fetch all comments on component mount
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
  
  const {userId} = useParams()
  const handleLike = async (postId) => {
    const userId = User.user._id;
    
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/post/${postId}/like`,
        { userId }
      );
      setLikes({ likes: res.data });
      isLiked ? setIsLiked(false) : setIsLiked(true);
      setLikes({ status: isLiked });
      window.location.reload();
    } catch (err) {
      console.log(`error with like post ${err}`);
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
        console.log("Problem with the deletion of the POST");
      }
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    const fetchComments = async (postId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/${postId}/comments`
        );
        setComments({ data: response.data.comments });
      } catch (error) {
        console.error(error);
        setError("Failed to fetch comments");
      }
    };
    fetchComments();
  }, []);
  const handleAddComment = async (postId) => {
    console.log("postId is :", postId);
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
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
      setNewComment("");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Failed to add comment");
    }
  };
    
  useEffect(() => {
    const fetchAllPosts = async ( user = userId) => {
      try {
        
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/user/${user}/allposts`
        );
        const data = res.data;
        if (data.status) {
          setAllPosts(data.allPosts);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch all posts:", error);
      }
    };
    fetchAllPosts();
  }, []);
  console.log(allPosts);
  
  const [totalLikes, setTotalLikes] = useState(0);
 
  useEffect(() => {
    const fetchTotalLikes = async () => {
    
      try {
       const user = userId
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/user/${user}/likes`);
					setTotalLikes(res.data.totalLikes);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchTotalLikes();
  }, []);

  return (
    <>
     <div className="card-header d-flex justify-content-between">
                    
                    <div className="header-title d-flex justify-content-around w-75">
                      <h4 className="card-title">{allPosts.length} Posts </h4> 
                      <h4 className="card-title">{totalLikes} Likes</h4> 
                      
                   </div> 
                 </div>
      {allPosts?.map((post) => (
        <Col sm={12} key={post.postId}>
          <Card className=" card-block card-stretch card-height">
            <Card.Body>
              <div className="user-post-data">
                <div className="d-flex justify-content-between">
                  <div className="me-3">
                    <img
                      className="avatar-60 rounded-circle"
                      src={`http://localhost:9000/data/${picture}`}
                      alt=""
                    />
                  </div>

                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="mb-0 d-inline-block">{post.fullName}</h5>
                      </div>
                      <div className="card-post-toolbar">
                        <Dropdown>
                          <Dropdown.Toggle variant="bg-transparent">
                            <span className="material-symbols-outlined">
                              more_horiz
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu m-0 p-0">
                            {User.user._id === post.userId ? (
                              <Dropdown.Item
                                className=" p-3"
                                to="#"
                                onClick={() => handleDelete(post._id)}
                              >
                                <div className="d-flex align-items-top">
                                  <div className="h4 material-symbols-outlined">
                                    <i className="ri-save-line"></i>
                                  </div>
                                  <div className="data ms-2">
                                    <h6>Delete Post</h6>
                                  </div>
                                </div>
                              </Dropdown.Item>
                            ) : (
                              <></>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p>{post.desc}</p>
              </div>
              <div className="user-post">
                <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                  <div className="row-span-2 row-span-md-1"></div>

                  <img
                    className="imgspecif"
                    width={300}
                    src={`http://localhost:9000/data/${post.image}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="comment-area mt-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="like-block position-relative d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="like-data">
                        <Link>
                        <img
                          onClick={() => handleLike(post._id)}
                          src={icon2}
                          className="img-fluid"
                          alt=""
                        /></Link>
                      </div>
                      <div className="total-like-block ms-2 me-3">
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} id="post-option">
                            {/* { isLiked ? (
                                          <button onClick={handleLike} >{isLiked && "Dislike"}</button>
                                        ) : (
                                          <button onClick={handleLike}>{!isLiked && "Like"}</button>
                                        )} */}
                            <p>{post.likes.length} Likes</p>
                          </Dropdown.Toggle>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="total-comment-block">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="post-option">
                          <p>{post.comments.length} Comments</p>
                        </Dropdown.Toggle>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
                <Link to="#"  className="d-flex align-items-center">
                    <span className="material-symbols-outlined md-18">
                        share
                    </span>
                    <span className='ms-1' onClick={() => signalPost(post._id)}>
		                              {loadingp ? 'Sending...' : 'Post Signaled'}
	                                          </span>
                </Link>  
                </div>
                </div>
                <hr />
                <ul className="post-comments list-inline p-0 m-0">
                  {post.comments.map((item, i) => (
                    <li>
                      {console.log(item)}
                      <div className="d-flex">
                        <div className="user-img">
                          <img
                            key={i}
                            src={`http://localhost:9000/data/${item?.user?.picture}`}
                            alt="user1"
                            className="avatar-35 rounded-circle img-fluid"
                          />
                        </div>

                        <div
                          className="comment-data-block ms-3"
                          key={item.user}
                        >
                          <h5>{item.fullName}</h5>
                          <p className="mb-0">{item.comment}</p>
                          {User.user._id === post.userId ? (
                          <div className="d-flex flex-wrap align-items-center comment-activity">
                            <p
                              className="btn mycustumclass "
                              onClick={() => deleteComment(post._id, item._id)}
                            >
                              Delete Comment
                            </p>
                          </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <form className="comment-text d-flex align-items-center mt-3">
                  <input
                    type="text"
                    className="form-control rounded"
                    placeholder="Enter Your Comment"
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="comment-attagement d-flex">
                  <Link to="#">
                    <i
                      className="ri-link me-3"
                      onClick={() => handleAddComment(post._id)}
                    >
                      {" "}
                    </i>
                     </Link>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default PostUserProfile;
