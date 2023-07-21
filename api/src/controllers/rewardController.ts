import { Request, Response } from "express";
import { User } from "../entities/User";

const getRewards = async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { email: req.body.userEmail } });

  if (!user) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "User does not exist",
      },
    });
  }

  console.log(user);

  return res.status(201).json({
    status: true,
    payload: {
      reward: user.rewards,
    },
  });
};

const addRewards = async (req: Request, res: Response) => {
  const userEmail = req.body.email;
  const rewards = req.body.rewards;
  const dataSource = req.app.locals.context.dataSource;
  const user = await User.findOne({ where: { email: userEmail } });

  if (!user) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "User does not exist",
      },
    });
  }

  try {
    await dataSource.query(
      `
        update "user"
        set rewards = rewards + $1
        where email = $2
        `,
      [rewards, userEmail]
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
    });
  }

  const newUser = await User.findOne({ where: { email: userEmail } });

  return res.status(201).json({
    status: true,
    payload: {
      reward: newUser?.rewards,
    },
  });
};

const removeRewards = async (req: Request, res: Response) => {
  const userEmail = req.body.email;
  // by how many points to reduce
  const points = req.body.points;
  const dataSource = req.app.locals.context.dataSource;
  const user = await User.findOne({ where: { email: userEmail } });

  if (!user) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "User does not exist",
      },
    });
  }

  try {
    if (user.rewards < points) {
      await dataSource.query(
        `
          update "user"
          set rewards = 0
          where email = $1
          `,
        [userEmail]
      );
    } else {
      await dataSource.query(
        `
          update "user"
          set rewards = rewards - $1
          where email = $2
          `,
        [points, userEmail]
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
    });
  }

  const newUser = await User.findOne({ where: { email: userEmail } });

  return res.status(201).json({
    status: true,
    payload: {
      reward: newUser?.rewards,
    },
  });
};

export { getRewards, addRewards, removeRewards };
