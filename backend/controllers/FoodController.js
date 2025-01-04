import foodModel from "../models/FoodModel.js";
import fs from 'fs'



//thêm đồ ăn 

const addFood = async(req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food added successfully!"})
    } catch (error) {
        console.log(error)
        res.json({successL:false,message:"Lỗi!"})
    }
}

//liệt kê ds đồ ăn 

const listfood = async(req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error!"})

    }
}


//xóa
const removefood = async(req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food remove!"})
    } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error!"})
}
}
export{addFood,listfood,removefood}