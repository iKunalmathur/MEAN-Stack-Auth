const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema 

const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

//FIND USER BY ID
module.exports.getUserById=function(id,callback){
    console.log("----------");
    console.log(id);
    console.log("----------");
    User.findById(id, callback);
}
//FIND USER BY USERNAME
module.exports.getUserByUsername=function(username,callback){
    // 1st method
        // const query = {username: username}
        // User.findOne(query, callback);
    // 2nd method
        User.findOne({ username: username }, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err , hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash ,(err, isMatch) =>{
        if(err) throw err;
        callback(null, isMatch);
    });
}
