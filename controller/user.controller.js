let universalFunctions=require("../utils/universalFunctions");
let Joi       =require("joi");
let models    = require("../models/index"); 
const { ObjectId } = require('mongodb');


let curd={

    getuserProfile : async function (req, res) {
        try {

         let id=req.paramse.id;

         let data = await models.userSchema.create(req.body)
          if (!data) {
            return universalFunctions.sendError(
              {
                statusCode: 400,
                message: "NO  category added in system or add category",
              },
              res
            )
          }
          
          return universalFunctions.sendSuccess(
             {
                  statusCode: 200,
                  message: "category get Successfull",
                  data: data,
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


