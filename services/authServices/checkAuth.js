
const Jwt               = require("jsonwebtoken");
const Boom =require("boom");
let universalFunctions= require("../../utils/universalFunctions");
let  models=require("../../models/index");
const checkAuth =  async(req, res, next) => {
    const token = req.headers["x-access-token"]  || req.headers["token"];
    let address=req.query["x-access-address"];
    // console.log("token:",token);
    // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDViNmZiNDJhZDYyNTZkOWFlZTM0ZTYiLCJpYXQiOjE2ODM3MTM5NzJ9.2ogtd8Et1tgL4l1jwnumJyNxRizYmcqeMzddOIy6SOk"

      if (token) {
        // let decoded = jwt_decode(token);
        Jwt.verify(token,"secretKey", async function (err, decoded) {
          try {



            console.log("decoded inside",decoded);
  
              let model = models.userSchema;
              // let user = await model.findOne({ firebaseUserId: decoded.user_id });
              let user = await model.findOne({ _id: decoded.userId });
  
              if (!user) {
                throw Boom.unauthorized("USER_NOT_FOUND");
              }
              user = user.toJSON();
              // console.log("decoded" , user);
  

              
         
                let userInfo = {
                  id: user._id,
                  name: user.firstName,
                  email: user.email ? user.email :"",
                  phoneNumber: user.phoneNumber ? user.phoneNumber : "",
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


