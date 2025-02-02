import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import "dotenv/config"

//login user
const loginUser=async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not exists"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token=await createToken(user._id)
        return res.json({success:true,token})
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"24h"})
}

//register user
const registerUser=async(req,res)=>{
    console.log(req.body)
    const {name,password,email} =req.body;
    try{
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        //validate email
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Password is too short"});
        }

        //hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashPassword
        });
        const user=await newUser.save();
        const token=await createToken(user._id);
        res.json({success:true,token})
    }catch(error){
        console.log(error);
        res.json({success:"false",message:"Error"})
    }
}
export {loginUser,registerUser}