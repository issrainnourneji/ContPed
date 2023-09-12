const express = require("express");

const courseController = require("../controller/controller.course");
const { authorize, AUTH_ROLES } = require("../middleware/auth");
const { EXPERT, USER } = AUTH_ROLES;
const { upload } = require("../utils/upload");

const route = express.Router();

route.post(
  "/addCourse",
  upload.single("coursePhoto"),
  courseController.addCourse
);

route.post(
  "/addCourseTemplate",
  upload.single("coursePhoto"),
  courseController.addCourseTemplate
);

route.put(
  "/uploadImage",
  upload.single("paragraphImages"),
  courseController.uploadPhoto
);

route.get("/getUserById/:id", courseController.getUserById);
route.get("/getPhoto/:id", courseController.getPhoto);
route.get("/getPhotoCouv/:id", courseController.getPhotoCouv);

route.post(
  "/addChapter",
  upload.fields([{name:1},{name:2}]),
  courseController.addChapter
);

route.put(
  "/updateChapter",
  upload.array('paragraphVideos',10),
  courseController.updateChapter
);

route.get("/getAllCourses", courseController.getAllCourses);
route.get("/getCourseById/:id", courseController.getCourseById);
route.get("/getCourseByOwnerId", courseController.getCourseByOwnerId);
route.get("/getCourseBySubscribedId", courseController.getCourseBySubscribedId);

route.get("/getChapterById/:id", courseController.getChapterById);

route.put("/applyToCourse/:id", courseController.applyCourse);

route.put(
  "/deleteCourseById",
  authorize([EXPERT]),
  courseController.deleteCourseById
);

route.put(
  "/updateCourseById/:id",
  authorize([EXPERT]),
  courseController.updateCourseById
);

route.get("/getAllOwners", courseController.getAllExpertsOwnersArray);

route.get(
  "/getProgression/:courseId/:userId",
  courseController.getProgressionCourseByUserIdAndCourseId
);
//courseId and userId in pathParam + 1 to increment and -1 to decrement in the body taht typeOfUpdate
route.put(
  "/updateProgression/:courseId/:userId",
  courseController.updateProgressionCourseByUserIdAndCourseId
);
//courseId and chapterId in body of req 
route.put(
  "/deleteChapterInCourse",
  courseController.deleteChapterInCourseById
);
//courseId in body of req
route.put(
  "/deleteCourseByIdLTS",
  courseController.deleteCourseByIdLTS
);
//courseId of the course in the body of req
route.put(
  "/deleteQuizzCourseById",
  courseController.deleteQuizzInCourseById
);

// route.post("",upload.fields([{name: "image as in input"}, {name: "video as in input"}]), )


//this is what i'm gonna work with
route.post("/gg",upload.fields([{name:1},{name:3}]),(req,res)=>{return res.json(req.files)})
module.exports = route;
