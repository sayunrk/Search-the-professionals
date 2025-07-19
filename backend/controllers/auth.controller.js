//let users = []; // in memory user storage (temporary)
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export async function register(req, res) {
    try{
        const {username, password} = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    }
    
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "USer registered sucessfully"})
    }finally{
            res.status(201).json({message: 'User registered sucessfully'});
    }

}
export async function login(req, res){
    try{
        console.log(req.body);
        
        const { username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) return res.status(401).send({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials")

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: "1h"})
        res.json({message: "Login sucessfull", user,token});
    } catch (e){
        console.log(e);
        
        return res.status(500).json(e);
    }
}