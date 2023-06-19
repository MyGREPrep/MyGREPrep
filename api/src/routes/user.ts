import express from "express";
import {
  changePassword,
  forgotPassword,
  registerUser,
  users,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", users);
userRouter.get("/forgot-password", forgotPassword);
userRouter.get("/change-password", changePassword);

export default userRouter;
