import express from "express"
import { registerUser, loginUser } from "../controllers/UserController.js"

const userRouter = express.Router();

userRouter.post("/dangki", registerUser);
userRouter.post("/dangnhap", loginUser);

export default userRouter;