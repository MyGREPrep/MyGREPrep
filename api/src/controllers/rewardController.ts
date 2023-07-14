import { Request, Response } from "express";
import { User } from "src/entities/User";

const getRewards = async (req: Request, res: Response) => {
  const user = await User.find({ where: { email: req.body.userEmail } });

  if (!user) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "User does not exist",
      },
    });
  }

  return res.status(201).json({
    status: true,
    payload: {
      reward: user[0].rewards,
    },
  });
};

const addRewards = async (req: Request, res: Response) => {
  const userEmail = req.body.email;
  const rewards = req.body.rewards;
  const dataSource = req.app.locals.context.dataSource;
  const user = await User.find({ where: { email: userEmail } });

  if (!user) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "User does not exist",
      },
    });
  }

  let newRewards;

  try {
    newRewards = await dataSource.query(
      `
        update "user"
        set rewards = rewards + $1
        where email = $2
        `,
      [rewards, userEmail]
    );
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({
    status: true,
    payload: {
      newRewards: newRewards,
    },
  });
};

export { getRewards, addRewards };
