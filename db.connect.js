const mongoose         = require("mongoose")
const config           = require("config")
function mongoConnect() {
  try {
    const url = config.get("db.databaseUrl")
    console.log("Url mongo:", url)
    mongoose.connect(
      url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (error) => {
        if(error==null){
          console.log("connection successfully DB")
        }else{
        console.log("connection error", error)
        }
      }
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}
exports.mongoConnect = mongoConnect
