let universalFunctions =require("../utils/universalFunctions");
let Joi                =require("joi");
let models             = require("../models/index"); 
const { ObjectId }     = require('mongodb');


let curd={
  createSurvey : async function (req, res) {
try {
      let payload = req.body;
      let postBy=req.usser._id;
    
    payload.postedBy=postBy;
    let data=await models.surveyModel.create(payload);
      return universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message:  " Successfull",
              data:data,
            },
            res
          )
        }
       catch (error) {
        return universalFunctions.sendError(error, res)
      }
},
  getSurvey : async function (req, res) {
    try {

      let data=await models.surveyModel.find({});
      
          return universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "post   Successfull",
              data:data
            },
            res
          )
        }
       catch (error) {
        return universalFunctions.sendError(error, res)
      }
},

updateJobpost : async function (req, res) {
  try {
      let playload=req.body;
      let id = req.user.id;
       if(!id){

        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: "id not found",
          },
          res
        );       
        } 
      
        console.log(id,playload)
      
        
       let user= await  models.userSchema.findOneAndUpdate(
         {
          _id:id
        },
           {$set:playload},
           { new: true }
       );


        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "post   Successfull",
          },
          res
        )
      }
     catch (error) {
      return universalFunctions.sendError(error, res)
    }
},
   

}

module.exports=curd;


