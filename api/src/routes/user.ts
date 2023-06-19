import express from "express";
import { registerUser, users } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", users);

export default userRouter;
