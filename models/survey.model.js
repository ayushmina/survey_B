const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const survey = new Schema(
{
    postedBy:{type: Schema.ObjectId, ref: "surveyusers"},
    Title:{type: String,trim: true},
    questions:[
      {
      type:Object,
      response: Schema.Types.Mixed 
    }
  ]
});

module.exports = mongoose.model("survey", survey);