import { Schema,model } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: String, 
    createAt: {
        type: Date,
        default: Date.now
    }
});

const User = model('User', userSchema);
export default User;