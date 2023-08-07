const universalFunctions                     = require("../utils/universalFunctions")
const models                                 = require("./../models/index");
const responseMessages                       = require("../resources/response.json");
const config                                 = require("config");
// const {jwtAppTokenGenerator}                 = require("../../utils/JwtFunctions");
const Joi                                    = require("joi");
const Boom                                   = require("boom");
// const {sendEmail}                            = require("../../services/MailServices/emailServicesSMTP");
const {createaccessToken}                    = require("../services/authServices/sessionmanger");

exports.signinUser = async function (req, res) {
    try {
    
      const schema = Joi.object().keys({
        userName: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
      })      
      await universalFunctions.validateRequestPayload(req.body, res, schema)
      let payload = req.body;

      let userInfo = await models.users.findOne({
        userName: payload.userName
      })
      if (!userInfo) {
        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: responseMessages.USER_NOT_FOUND,
          },
          res
        )
      } else {

        if (!userInfo.authenticate(req.body.password)) {
          throw Boom.badRequest("Authentication failed Passwords did not match")
        }
        
        let tokenn = {
          userId: userInfo._id,
        };
        
        let token = await createaccessToken(tokenn);


     let user = {
          token:token,
          _id: userInfo._id,
          name: userInfo.name,
          email: userInfo.email,
          isPhoneVerified: userInfo.isPhoneVerified,
        }
  
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "SIGNIN_SUCCESS",
            data: user,
          },
          res
        )
      }
    } catch (error) {
      return universalFunctions.sendError(error, res)
    }
  }  
  exports.signup = async function (req, res) {
    try {
   
      let payload = req.body
      console.log("payload", payload)
      let userExists = await models.users.findOne({
        userName: payload.userName,
      })
      if (userExists) {
        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: responseMessages.ALREADYEXIST,
          },
          res
        )
      } else {
        const schema = Joi.object().keys({
          firstName: Joi.string().trim().required(),
          password: Joi.string().trim().required(),

        })
        // await universalFunctions.validateRequestPayload(req.body, res, schema)

        let payload=req.body;

        let userInfo = await models.users.create(payload);
        let tokenn = {
          userId: userInfo._id,
          address:userInfo.address
        };
        let token = await createaccessToken(tokenn);
        // console.log(token,"token:123")
        //  token =await  jwtAppTokenGenerator(userInfo._id,payload.deviceType,payload.deviceToken);  

  
        let user = {
          _id: userInfo._id,
          email: userInfo.email,
          name: userInfo.firstName,
          address:userInfo.address,
          token:token,        
        }
  
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "USER_CREATED_SUCCESSFULLY",
            
            data: user,
          },
          res
        )
      }
    } catch (error) {
      return universalFunctions.sendError(error, res)
    }
  }
 
