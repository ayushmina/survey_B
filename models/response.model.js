const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    survey: { type: Schema.Types.ObjectId, ref: "Survey" }, // Reference to the survey
    user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the user who responded
    responses: [
        {
          question:String,
          answer: String, // You can adjust this based on the type of answer you're storing
          response: Schema.Types.Mixed
        }
      ]
  });

module.exports = mongoose.model("response", responseSchema);