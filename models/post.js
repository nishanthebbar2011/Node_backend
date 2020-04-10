var mongoose = require("mongoose");
const date = require('date-and-time');
const User = require('./user');

var PostSchema = new mongoose.Schema({

    subject :{
        type : String,
        required : true,
    },

    content : {
        type : String, 
    },
    
    author : {
        type  : mongoose.Schema.Types.ObjectId, 
        ref : 'User', 
        required : true,
    },

    likedBy : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],

    createddOn : {
        type : Date,
        default : Date.now
    }

})

//Create Posts Model
const Post = mongoose.model("Post", PostSchema);

//Exports Posts Model
module.exports = Post;