const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    survey: { type: Schema.Types.ObjectId, ref: "Survey" }, // Reference to the survey
    Title:{type: String},
    user: { type: Schema.Types.ObjectId, ref: "surveyusers" }, // Reference to the user who responded
    responses: [
        {
          type:Object,
          response: Schema.Types.Mixed 
        }
      ]
  });

module.exports = mongoose.model("response", responseSchema);