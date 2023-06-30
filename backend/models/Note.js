const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('notes', NotesSchema);


/**
 * Q. about model:- 
 The model you define in the Node. 
 js server is an abstraction of the data in your MongoDB database, 
 which is represented as a document. Because of this abstraction, 
 you may use the “Mongoose” schemas to construct a blueprint of how you want the added data to look and behave.
 */