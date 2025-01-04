import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// dang nhap cho user 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Email does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect password" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred, please try again later" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// dang ky cho user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    //Hàm kiểm tra tồn tại của email
    try {
        const exists = await userModel.findOne({ email });
        if (exists){
            return res.json({ success: false, message: "Email already exists" });
        } 
        //Hàm kiểm tra độ dài của password và tính hợp lệ của email
        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        //Mã hóa password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Tạo user mới
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        //Lưu user mới vào database
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred, please try again later" });
    }
}

export { loginUser, registerUser };