

import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"; 
const experienceSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        role: String,
    },

    experience: [experienceSchema]
    
}, {
  
    timestamps: true
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = model('User', userSchema);
export default User;