const mongoose         = require("mongoose")
const config           = require("config")
function mongoConnect() {
  try {
    const url = "mongodb+srv://aayush:ayush@cluster0.rk3ez6o.mongodb.net/?retryWrites=true&w=majority";
    console.log("Url mongo:", url)
    mongoose.connect(url).then(()=>{
      console.log(" ok db connect")
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
exports.mongoConnect = mongoConnect
