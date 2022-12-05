const mongoose = require('mongoose');

const connectDb = async() => {
  try{
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log('Db connected');
  }catch(error){
    console.log(error);
  }
}

module.exports =connectDb;