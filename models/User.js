const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Please enter an email address']
    },
    firstName: {
        type: String,
        required: [true,'Please enter your first name']
    },
    lastName: {
        type: String,
        required: [true,'Please enter your last name']
    },
    password: {
        type: String,
        required: [true,'Please enter a password']
    },
    service: {
        type: String,
        required: [true,'Please enter a service']
    },
    bio: {
        type: String,
        required: [true,'Please enter a bio']
    },
    telephone : {
        type: Number,
        required: [true,'Please enter your telephone tumber']
    },
    pic: {
        type: String,
        required: [true,'Please enter a pic url']
    },
    isServiceProvider:{
        type: Boolean,
        required: [true,'Are you a service provider?']
    }
})

module.exports = mongoose.model('User',UserSchema)