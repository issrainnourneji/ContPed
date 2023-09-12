const express = require('express');

const testsController = require('../controller/controller.tests');
const { authorize, AUTH_ROLES } = require("../middleware/auth");
const { EXPERT, USER } = AUTH_ROLES;

const route = express.Router();

route.post('/addTest', testsController.addTest);

route.get("/getAllTestObject", testsController.getAllTestsObject);
route.get("/getAllTestData", testsController.getAllTestsData);
route.get("/getTestObjectById/:id", testsController.getTestObjectById);
route.get("/getTestDataById/:id", testsController.getTestDataById);

route.put("/updateTestById/:id", testsController.updateTestById);

route.put("/updateTestByIdLTS/:id", testsController.updateTestByIdLTS);

route.put("/applyUserById/:id", testsController.applyTestById)

//this is for the reultTest 
route.post("/addResult", testsController.addResult);

route.get("/getResult/:idTest/:idUser", testsController.getResultBy2Ids);

module.exports = route;