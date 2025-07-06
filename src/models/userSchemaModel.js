const mongoose = require("mongoose");
const { Schema, Types } = mongoose;


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    otp : {
        type : Number,
    },
    expireOtp: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true,
    },

},
    {timestamps: true}  
)

const userModel = mongoose.model("user", userSchema)

module.exports = { userModel }