const Boom                = require("boom");
const config              = require("config");
const jwt                 = require("jsonwebtoken");
const jwtSecret=config.get("jwt.secret");

const jwtGenerator  = async (userId) => {
  const token =await jwt.sign({ user_id: userId,deviceType:'1',deviceToken:"" }, jwtSecret);
  return token;
};
const jwtAppTokenGenerator = async (userId,deviceType,deviceToken) => {
  const token =await jwt.sign({ user_id: userId,deviceType,deviceToken }, jwtSecret);
  // console.log("token",token);
  return token;
};
module.exports = {
  jwtGenerator,
  jwtAppTokenGenerator
};