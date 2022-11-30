const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/inotebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connect to mongo sucessfully");
    })
}

module.exports = connectToMongo;