const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload");

const {createPost,signalerUPost,getUserData, getTotalLikes,getPost, updatePost,addComent,getUserByID, deletePost,deleteComment, getAllPostsByUserId,getAllComents,likePost, getTimelinePosts,getAllPost} = require('../controller/controller.post')

router.post("/" ,upload.single("image"), createPost)
router.get("/:id" , getPost)
router.put("/:id" , updatePost)
router.delete("/:id" , deletePost)
router.put("/:id/like" , likePost)
router.get("/:id/timeline" , getTimelinePosts)
router.get('/', getAllPost);
router.post('/:id/comment', addComent);
router.delete('/:id/comment/:commentId', deleteComment);
router.get('/user/:id', getUserByID);
router.get('/user/:userId/likes', getTotalLikes);
router.post('/:postId/user/:userId', signalerUPost);
router.get('/users/:userId', getUserData);

router.get('/:id/comments', getAllComents);
router.get("/user/:id/allposts", getAllPostsByUserId)
module.exports = router;
