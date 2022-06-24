const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    birthday:{
        type:Date
    },
    avatar:{
        type:String
    },
    subscription:{
        type:String
    },
    date:{
        type:Date
    },
    posts:{
        type:"string"
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;
