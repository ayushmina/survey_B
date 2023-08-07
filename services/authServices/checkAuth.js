
const Jwt               = require("jsonwebtoken");
const Boom =require("boom");
let universalFunctions= require("../../utils/universalFunctions");
let  models=require("../../models/index");
const checkAuth =  async(req, res, next) => {
    // const token = req.headers["x-access-token"]  || req.headers["token"]|| req.headers.get("authorization");
    let address=req.query["x-access-address"];
    // console.log("token:",req.headers.get("authorization"));
    let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQwNzY4MjE3MzRkYWM4ZmVjMjkxMjciLCJpYXQiOjE2OTEzODM0Mjd9.m4TOWRkk3zzNPojGA7MeTJGCRQYpr0VRvYmFrOT3DzY"

      if (token) {
        // let decoded = jwt_decode(token);
        Jwt.verify(token,"secretKey", async function (err, decoded) {
          try {



            console.log("decoded inside",decoded);
  
              let model = models.users;
              // let user = await model.findOne({ firebaseUserId: decoded.user_id });
              let user = await model.findOne({ _id: decoded.userId });
  
              if (!user) {
                throw Boom.unauthorized("USER_NOT_FOUND");
              }
              user = user.toJSON();
              // console.log("decoded" , user);
  

              
         
                let userInfo = {
                  id: user._id,
                  userName: user.userName?user.userName:"",
                };
                req.user = userInfo;
                next();
  
          } catch (error) {
            return universalFunctions.sendError(error, res);
          }
  
         })
        
      } else {
        return universalFunctions.sendError(
          Boom.forbidden("TOKEN_NOT_PROVIDED"),
          res
        );
      }
  };

module.exports=checkAuth;


