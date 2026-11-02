const mongoose=require('mongoose');

const dns=require("dns")
dns.setServers(['8.8.8.8','1.1.1.1'])


async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb+srv://sourabh_user:admin123456@cluster0.ftfbg.mongodb.net/myincidentsdb");
    console.log("You successfully connected to MongoDB!");
    return mongoose;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}

module.exports={connectToMongoDB,disconnectFromMongoDB}