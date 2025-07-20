const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
    },
    
   firebaseUid: {
    type: String, 
    unique: true,
    sparse: true
  },
   password: { type: String }, 
    mobile: {
        type: Number,
        required: [true, "mobile number is required"]
    },

    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("User", UserSchema)