import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
const addFood=async(req,res)=>{
    console.log(req.body)

    let image_filename=`${req.file.filename}`
    
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })   
    console.log("food",food) 
    try{
        await food.save();
        res.json({success:true,message:"food added"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error})
    }
}

const removeFood=async(req,res)=>{
    try{
        console.log(req.body);
        const food=await foodModel.findById(req.body._id);
        console.log(food);
        fs.unlink("../uploads/1738342391155food_1.png",()=>{console.log("unlinked")})
        await foodModel.findByIdAndDelete(req.body._id);
        res.json({success:true,message:"Food Removed"})
    }catch(error){
        res.json({success:false,Error:error})

    }
}

export {addFood,listFood,removeFood}