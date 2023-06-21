import express from "express";
import {
  changePassword,
  forgotPassword,
  registerUser,
  users,
  verifyOtp,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", users);
userRouter.get("/forgot-password", forgotPassword);
userRouter.get("/change-password", changePassword);
userRouter.get("/verify-otp", verifyOtp);

export default userRouter;
