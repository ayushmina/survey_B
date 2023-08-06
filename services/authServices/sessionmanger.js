const Jwt               = require("jsonwebtoken");
const Config            =require("config");
const responseMessage   =require("../../resources/response.json");
const Boom              =require("boom");
const unversalFunction  =require("../../utils/universalFunctions");
const models            =require("../../Models/");



const destroySession = async (token) => {
  try {
    if (token) {
      Jwt.verify(token, Config.get("jwt.secret"), async function (
        err,
        decoded
      ) {
        const criteria = {
          userId: decoded.userId,
          _id: decoded.sessionId,
        };
        let model = models.userSessionSchema;
        const session = await model.findOne(criteria);

        if (session) {
          let update = await model.findOneAndUpdate(
            criteria,
            { isDeleted: true, logoutAt: new Date() },
            { new: true }
          );
          if (!update) {
            throw Boom.unauthorized(responseMessage.SESSION_EXPIRED);
          }
        } else {
          throw Boom.unauthorized(responseMessage.INVALID_TOKEN);
        }
      });
    } else {
      return unversalFunction.sendError(
        Boom.forbidden(responseMessage.TOKEN_NOT_PROVIDED),
        res
      );
    }
  } catch (error) {
    return unversalFunction.sendError(error);
  }
};

const createToken = async (payloadData, time) => {
  
  return new Promise((resolve, reject) => {
    Jwt.sign(payloadData,"secretKey", (err, jwt) => {
      if (err) {
        reject(err);
      } else {
        resolve(jwt);
      }
    });
  });
};

const sessionManager = async (sessionData) => {
  try {
        return webSessionManager(
          defaults.webMultiSession,
          tokenExpireTime,
          sessionData
        );
     
     
  } catch (error) {
    throw error;
  }
  
};

const webSessionManager = async (webMultiSession, expireTime, sessionData) => {
  try {
    const tokenData = {
      userId: sessionData.userId,
    };

    return createaccessToken(tokenData, expireTime);
  } catch (error) {
    throw error;
  }
};

const deviceSessionManager = async (
  deviceMultiSession,
  expireTime,
  sessionData  ) => {
  try {
    const dataToSave = {
      userId: sessionData.userId,
    };

    let model = models.userSessionSchema;

    if (!deviceMultiSession) {
      await model.remove({
        userId: sessionData.userId
      });
    }

    const session = await model.create(dataToSave);

    const tokenData = {
      userId: sessionData.userId,
      sessionId: session._id,
      deviceType: sessionData.deviceType,
    };

    return createaccessToken(tokenData, expireTime);
  } catch (error) {
    throw error;
  }
};

const createaccessToken = async (tokenData, expireTime=1440) => {
  try {

    const accessToken = await createToken(tokenData, expireTime);
    
    if (accessToken) {
      return accessToken;
    } else {
      throw Boom.badRequest(responseMessage.DEFAULT);
    }
  } catch (error) {
    throw error;
  }
};




module.exports = {
  sessionManager,
  destroySession,
  createaccessToken
  
};
