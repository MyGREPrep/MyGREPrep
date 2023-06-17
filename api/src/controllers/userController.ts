import argon2 from "argon2";
import { User } from "../entities/User";
import { dataSource } from "../utils/typeORMConfig";

const registerUser = async (req: any, res: any) => {
  const hashedPassword = await argon2.hash(req.body.password);

  let user;

  try {
    const result = await dataSource
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

    user = result.raw[0];
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

  console.log(user);

  return res.status(201).json({
    status: true,
    payload: {
      message: "User has been created",
    },
  });
};

const users = async (req: any, res: any) => {
  const users = await User.find({});

  return res.status(201).json({
    status: true,
    payload: {
      users,
    },
  });
};

export { registerUser, users };
