const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
        type: String,
        trim: true,
      },
     password: {
        type: String,
        trim: true,
      },
});

module.exports = mongoose.model("user", UserSchema);