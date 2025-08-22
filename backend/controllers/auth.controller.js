//let users = []; // in memory user storage (temporary)
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";


export async function register(req, res) {
    try {
       
        const { username, password, email, role } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, password, and email are required." });
        }

        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(400).json({ message: "A user with that username or email already exists." });
        }

        const user = new User({ username, password, email, role });
        await user.save(); 

        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        console.error("REGISTRATION ERROR:", e);
        return res.status(500).json({ message: "An internal error occurred during registration." });
    }
}
export async function login(req, res){
    try{
        console.log(req.body);
        
        const { username, password} = req.body;
        const user = await User.findOne({username}).select('+password');
        if(!user) return res.status(401).send({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials")

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: "1h"})
        res.json({message: "Login sucessfull", user,token});
    } catch (e){
        
        return res.status(500).json(e);
    }
}
