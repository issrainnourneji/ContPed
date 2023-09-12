const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultTestSchema = new Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    testId : { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    testResult : { type: Number, default: null },
    didUserPassTest : { type: Boolean, default: false }
});


module.exports = mongoose.model("resultTest", resultTestSchema);