import express from "express"
import { registerUser, loginUser } from "../controllers/UserController.js"

const userRouter = express.Router();

userRouter.post("/Register", registerUser);
userRouter.post("/Login", loginUser);

export default userRouter;