const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}


const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(user, schema);
}


exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;