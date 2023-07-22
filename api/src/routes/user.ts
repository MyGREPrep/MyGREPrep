import express from "express";
import {
  changePassword,
  forgotPassword,
  registerUser,
  upgradeToPremium,
  users,
  verifyOtp,
} from "../controllers/userController";

const userRouter = express.Router();

/**
 * @swagger
 * /user/register:
 *      post:
 *          summary: Register a new user
 *          tags:
 *              - User API
 *          description: Register a new user once registration completes in Firebase (store a copy of the user).
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: parthdejong@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: 12345678
 *                              name:
 *                                  type: string
 *                                  example: Parth DeJong
 *                              photoUrl:
 *                                  type: string
 *                                  example: https://img.freepik.com/free-icon/user_318-563642.jpg?w=360
 *                              phoneNumber:
 *                                  type: integer
 *                                  example: 6789347834
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: true
 *                                  payload:
 *                                      type: object
 *                                      properties:
 *                                          message:
 *                                              type: string
 *                                              example: User has been created
 *              501:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: false
 */

/**
 * @swagger
 * /user/forgot-password:
 *      post:
 *          summary: User forgot their password
 *          tags:
 *              - User API
 *          description: User forgot their password, generate an one time password and send to the email.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: parthdejong@gmail.com
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: true
 *              501:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: true
 */

/**
 * @swagger
 * /user/change-password:
 *      post:
 *          summary: User changes their password
 *          tags:
 *              - User API
 *          description: User can change their password by providing the OTP generated.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: string
 *                                  example: 156897
 *                              password:
 *                                  type: string
 *                                  example: newPassword
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: true
 *              501:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: false
 */

/**
 * @swagger
 * /user/verify-otp:
 *      post:
 *          summary: Verify the OTP generated to the user
 *          tags:
 *              - User API
 *          description: User can check if their OTP is valid or not.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: string
 *                                  example: 156897
 *                              email:
 *                                  type: string
 *                                  example: parthdejong@gmail.com
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: true
 *                                  payload:
 *                                      type: object
 *                                      example: { message: Code is valid and verified }
 *              501:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: false
 *                                  payload:
 *                                      type: object
 *                                      example: { message: Code is invalid }
 */

/**
 * @swagger
 * /user/premium:
 *      post:
 *          summary: Premium subscription for the user
 *          tags:
 *              - User API
 *          description: User subscribes to premium for added benefits.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: parthdejong@gmail.com
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: true
 *                                  payload:
 *                                      type: object
 *                                      example: { message: User upgraded to premium successfully }
 *              501:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: false
 */

userRouter.post("/register", registerUser);
userRouter.get("/users", users);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/change-password", changePassword);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/premium", upgradeToPremium);

export default userRouter;
