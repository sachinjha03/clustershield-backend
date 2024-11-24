const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    subscriptionId: String,
    planId: String,
    subscriptionStatus: String,
    expiresAt: Date,
})

const User = new mongoose.model("User",userSchema)

module.exports = User;

