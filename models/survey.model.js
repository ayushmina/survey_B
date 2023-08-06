const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const survey = new Schema(
{
    postedBy:{type: Schema.ObjectId, ref: "user"},
    Title:{type: String,trim: true},
    question:[
      {
      type:Object,
      response: Schema.Types.Mixed 
    }
  ]
});

module.exports = mongoose.model("survey", survey);