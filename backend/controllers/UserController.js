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
            return res.json({ success: false, message: "Email không tồn tại" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.json({ success: false, message: "Mật khẩu không chính xác" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau" });
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
            return res.json({ success: false, message: "Email đã tồn tại" });
        } 
        //Hàm kiểm tra độ dài của password và tính hợp lệ của email
        if (password.length < 6) {
            return res.json({ success: false, message: "Mật khẩu phải có ít nhất 6 kí tự" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Email không hợp lệ" });
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
        res.json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau" });
    }
}

export { loginUser, registerUser };