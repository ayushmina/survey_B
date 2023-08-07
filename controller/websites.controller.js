let universalFunctions =require("../utils/universalFunctions");
let Joi                =require("joi");
let models             = require("../models/index"); 
const { ObjectId }     = require('mongodb');
const { response } = require("..");


let curd={
  createSurvey : async function (req, res) {
try {
      let payload = req.body;
      let postBy=req.user.id;
    
       payload.postedBy=postBy;
       console.log(payload,"here is surbvey");
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
getSurveyById : async function (req, res) {
  try {
    let id=req.params.id;
    console.log(id,"here is id");
    let data=await models.surveyModel.findOne({_id:id});
    
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "get survey   Successfull",
            data:data
          },
          res
        )
      }
     catch (error) {
      return universalFunctions.sendError(error, res)
    }
},

updateSurvey : async function (req, res) {
  try {
      let {Title,questions}=req.body;
      let payload={
        Title,questions
      }
      let id = req.body.id;
       if(!id){

        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: "not found",
          },
          res
        );       
        } 
      
        console.log(id,payload)
      
        
       let survey= await  models.surveyModel.findOneAndUpdate(
         {
          _id:id
        },
           {$set:payload},
           { new: true }
       );

        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "update Successfull",
          },
          res
        )
      }
     catch (error) {
      return universalFunctions.sendError(error, res)
    }
},
DeleteSurvey : async function (req, res) {
  try {
    
      let id = req.body.id;
       if(!id){

        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: "not found",
          },
          res
        );       
        } 
      

        
       let deletionResult= await  models.surveyModel.findOneAndDelete(
         {
          _id:id
        });
        if (deletionResult) {
          console.log('Survey deleted:', deletionResult);
        } else {
          console.log('Survey not found or not deleted');
        }
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "update Successfull",
            data:deletionResult
          },
          res
        )
      }
     catch (error) {
      return universalFunctions.sendError(error, res)
    }
},
responseCreate : async function (req, res) {
  try {
      let {Title,responses,_id}=req.body;
      let userId=req.user.id;
      let payload={
        Title,
        responses,
        survey:_id,
        user:userId
      }
      let id = req.body._id;
       if(!id){

        return universalFunctions.sendError(
          {
            statusCode: 400,
            message: "not found",
          },
          res
        );       
        } 
      
        console.log(id,payload)
      
        
       let survey= await  models.response.create(payload);

        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "update Successfull",
            data:survey
          },
          res
        )
      }
     catch (error) {
      return universalFunctions.sendError(error, res)
    }
},
myResponse : async function (req, res) {
  try {
      
    
       let response= await  models.response.find({});

        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "get Successfull",
            data:response
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


