const questionModel = require("../models/tests/model.question");
const testModel = require("../models/tests/model.tests");
const resultTestModel = require("../models/tests/model.result");
const UserModel = require("../models/model.user");
const axios = require("axios");

exports.addTest = async (req, res) => {
  const questionsData = req.body.listOfQuestions;
  let questionsArray = [];
  const questionsPromises = questionsData.map((e) => {
    const _question = new questionModel(e);
    return _question.save();
  });
  try {
    questionsArray = await Promise.all(questionsPromises);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }

  const data = {
    testTitle: req.body.testTitle,
    testDescription: req.body.testDescription,
    listOfQuestions: questionsArray,
    testPhoto: req.body.testPhoto,
    testOwner: req.body.testOwner,
    testTimer: req.body.testTimer,
    testCategory: req.body.testCategory
  };

  const _test = new testModel(data);
  _test
    .save()
    .then((createdTest) => {
      res.status(200).json({ message: "successs !!!!" });
    })
    .catch((error) => {
      res.status(400).json(error);
      console.log(error);
    });
};

exports.getAllTestsObject = async (req, res) => {
  try {
    await testModel
      .find({})
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).json(error);
        console.log(error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

exports.getAllTestsData = async (req, res) => {
  try {
    const testsObjectArrayPromises = await testModel.find({}).then((result) => {
      return result;
    });
    const testsObjectArray = await Promise.all(testsObjectArrayPromises);
    const questionsIdsArray = testsObjectArray.map((test) => {
      return test.listOfQuestions;
    });
    const questionDataPromises = questionsIdsArray.map(async (question) => {
      const sb = question.map(async (id) => {
        const Promises = await questionModel
          .findById(id)
          .then((res) => {
            return res;
          })
          .catch((error) => res.status(404).json({ message: "e" }));
        return Promises;
      });
      const sbData = await Promise.all(sb);
      return sbData;
    });
    const questionsArray = await Promise.all(questionDataPromises);

    const data = testsObjectArray.map((test, index) => {
      test.listOfQuestions = questionsArray[index];
      return test;
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getTestObjectById = async (req, res) => {
  id = req.params.id;
  try {
    const testObject = await testModel
      .findById(id)
      .then((result) => {
        return result;
      })
      .catch((error) =>
        res.status(400).json({ message: "Error while finding a test" + error })
      );
    res.status(200).send(testObject);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getTestDataById = async (req, res) => {
  id = req.params.id;
  try {
    const testObjectById = await testModel
      .findById(id)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        res.status(400).json({ message: "Error while getting test by Id" });
      });
    const questionsIdsArray = testObjectById.listOfQuestions;
    const sb = questionsIdsArray.map(async (questionId) => {
      const Promises = await questionModel
        .findById(questionId)
        .then((res) => {
          return res;
        })
        .catch((error) => res.status(400).json({ message: "Error" + error }));
      return Promises;
    });
    const sbData = await Promise.all(sb);
    let testDataById = testObjectById;
    testDataById.listOfQuestions = sbData;
    res.status(200).send(testDataById);
  } catch (error) {
    res.status(400).json({ message: "Error while getting a test by Id" });
  }
};

exports.updateTestByIdLTS = async (req, res) => {
  const id = req.params.id;
  let updatedTestContent = req.body.updatedTest;
  let questionsArrayContent = updatedTestContent.listOfQuestions;
  let questionArrayIds = [];
  try {
    questionsArrayContent.map(
      (question) => {
        if(question._id){
          questionModel.findByIdAndUpdate(question._id, question);
        }else{
          const Quest = new questionModel(question);
          Quest.save().then(
            (resultat) => { 
              testModel.findByIdAndUpdate(id, {$push: {listOfQuestions: resultat._id}})
             }
          ).catch(
            (error) => {return res.send("houni l ghalta 2")}
          )
        }
      }
    );
    // updatedTestContent.listOfQuestions = questionArrayIds;
    // await testModel.findByIdAndUpdate(id,updatedTestContent).then(
    //   (result) => { res.status(200).send(result) }
    // ).catch(
    //   (error) => { res.status(404).send(updatedTestContent) }
    // )
  } catch (error) {
    res.status(400).send(error)
  }
};

exports.updateTestById = async (req, res) => {
  const id = req.params.id;
  let updatedTestContent = req.body.updatedTest;
  const questionsData = updatedTestContent.listOfQuestions;
  let questionsArray = [];

  try {
    const questionsPromises = questionsData.map((e) => {
      const q = {
        questionTitle: e.questionTitle,
        suggestedResponse: e.suggestedResponse,
        correctResponse: e.correctResponse
      };
      const _question = new questionModel(q);
      return _question.save();
    });
    questionsArray = await Promise.all(questionsPromises);
    updatedTestContent.listOfQuestions = questionsArray;
    await testModel
          .findByIdAndUpdate(id, updatedTestContent)
          .then((RES) => res.status(200).send("success"))
          .catch((error) => {
            console.log(error);
            return res.status(408).send(error);
          });

        // axios.post("http://localhost:9000/tests/addTest", updatedTestContent)
        // .then((result) => {
        //     return res.status(200).json({ message: "Updated SUCCESSFULLY" });
        // }).catch((error) => {
        //     return res.status(400).json({ message: "Error while catching" })
        // });
        // const updatedTest = await testModel.findByIdAndDelete(id);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.applyTestById = async (req, res) => {
  const testID = req.params.id;
  const userID = req.body.userID;

  testModel
    .findByIdAndUpdate(testID, { $push: { listOfSubcribed: userID } })
    .then((result) => {
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send(result);
      }
    })
    .catch((error) => {
      return res.status(400).send(error);
    });
};

//this section is dedicated for the resultTest model
exports.addResult = async (req, res) => {
  const resultObject = req.body.resultObject;
  const _result = new resultTestModel(resultObject);
  await resultTestModel.deleteMany({
    userId: resultObject.userId,
    testId: resultObject.testId
  }).then(
    (result) => {
      _result.save().then(
        (result) => { return res.status(200).send(result) }
      ).catch(
        (error) => { return res.status(400).send(error) }
      )
    }
  ).catch((error) => {
    res.status(400).send(error)
  });
 
};

exports.getResultBy2Ids = async (req, res) => {
  const idTest = req.params.idTest;
  const idUser = req.params.idUser;
  await resultTestModel.findOne({userId: idUser, testId: idTest}).then(
    (result) => { res.status(200).send(result) }
  ).catch(
    (error) => { res.status(404).send(error) }
  )
};
