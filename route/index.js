const router = require("express").Router();
const { route } = require(".");

// Controllers
const userAuthAction=require("../controller/customAuth.controller");
const webAction=require("../controller/websites.controller");
const checkAuth = require("../services/authServices/checkAuth");


// admin pannel

router.route("/Signup").post(userAuthAction.signup);
router.route("/login").post(userAuthAction.signinUser);
router.route("/createSurvey").post(checkAuth,webAction.createSurvey);
router.route("/getsurvey").get(webAction.getSurvey);
router.route("/getSurveyById/:id").get(webAction.getSurveyById);
router.route("/updateSurvey").post(webAction.updateSurvey);
router.route("/DeleteSurvey").post(webAction.DeleteSurvey);
router.route("/responseCreate").post(checkAuth,webAction.responseCreate);
router.route("/myResponse").get(webAction.myResponse);











module.exports = router;