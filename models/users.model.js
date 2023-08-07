const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto")

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
      salt: {
        type: String,
      },
});
UserSchema.pre("save", function (next) {
  if (this.password && this.password.length > 0) {
    this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64")
    this.password = this.hashPassword(this.password)
  }
  next()
})

UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto
      .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
      .toString("base64")
  } else {
    console.log("hashPassword", password)
    return password
  }
}

UserSchema.methods.authenticate = function (password) {
  console.log("password", this.password === this.hashPassword(password))

  return this.password === this.hashPassword(password)
}

module.exports = mongoose.model("surveyusers", UserSchema);