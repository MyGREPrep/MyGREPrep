import argon2 from "argon2";
import { User } from "../entities/User";
import { dataSource } from "../utils/typeORMConfig";
import { Request, Response } from "express";
import { FORGET_PASSWORD_PREFIX } from "../utils/constants";
import { sendEmail } from "../utils/sendEmail";


const verifyAnswer = async (req: Request, res: Response) => {
  const userId = req.body.userId; 
  const questionId = req.body.questionId; 
  const selectedAnswer = req.body.selectedAnswer; 
  const question = await Question.find({ where: { id: questionId } });
  const options = await Option.find({ where: { questionId } });
  
  options.map((option)=>{
    if(option.isCorrect==true && selectedAnswer.id == option.id){
      res.status(200).json({
        status: true,
        payload: {
          message: "Correct",
        },
      });
    }
  })

  res.status(200).json({
    status: false,
    payload: {
      message: "Incorrect",
    },
  });


const registerUser = async (req: Request, res: Response) => {
  const hashedPassword = await argon2.hash(req.body.password);

  try {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        photoUrl: req.body.photoUrl,
        phoneNumber: req.body.phoneNumber,
      })
      .returning("*")
      .execute();

    // user = result.raw[0];
  } catch (error) {
    if (error.code === "23505") {
      return res.status(500).json({
        status: false,
        payload: {
          message: "User already exists",
        },
      });
    }
  }

  return res.status(201).json({
    status: true,
    payload: {
      message: "User has been created",
    },
  });
};

const users = async (_: Request, res: Response) => {
  const users = await User.find({});

  return res.status(201).json({
    status: true,
    payload: {
      users,
    },
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  const { redis } = req.app.locals.context;
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(201).json({
      status: true,
    });
  }

  const code = Math.floor(100000 + Math.random() * 900000);

  await redis.set(
    FORGET_PASSWORD_PREFIX + code,
    user.id,
    "EX",
    1000 * 60 * 60 * 24 * 3 // 3 days expiry
  );

  // now send the email
  await sendEmail(
    user.email,
    `<div>Your one time password for changing password is <b>${code}</b></div><div>Important: Don't share this with anyone. The password will expiry in 3 days</div>`
  );

  return res.status(201).json({
    status: true,
  });
};

const verifyOtp = async (req: Request, res: Response) => {
  const redis = req.app.locals.context.redis;
  const key = FORGET_PASSWORD_PREFIX + req.body.code;

  const userId = await redis.get(key);

  if (!userId) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "Code is invalid",
      },
    });
  }

  return res.status(201).json({
    status: true,
    payload: {
      message: "Code is valid and verified",
    },
  });
};

const changePassword = async (req: Request, res: Response) => {
  const redis = req.app.locals.context.redis;
  const key = FORGET_PASSWORD_PREFIX + req.body.code;
  const userId = await redis.get(key);

  if (!userId) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "Code expired",
      },
    });
  }

  const user = await User.findOne({ where: { id: parseInt(userId) } });

  if (!user) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "User no longer exists",
      },
    });
  }

  await User.update(
    { id: parseInt(userId) },
    { password: await argon2.hash(req.body.password) }
  );

  await redis.del(key);

  return res.status(201).json({
    status: true,
  });
};




export { registerUser, users, forgotPassword, changePassword, verifyOtp };
