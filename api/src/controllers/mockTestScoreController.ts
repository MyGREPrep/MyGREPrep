import { Request, Response } from "express";
import { Mocktestscore } from "../entities/MockTestScore";
import { User } from "../entities/User";

const createMockTestScore = async (req: Request, res: Response) => {
  const score = req.body.score;
  const email = req.body.email;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(500).json({
      status: false,
      payload: {
        message: "User does not exist",
      },
    });
  }

  const mockTestScore = await Mocktestscore.save({
    userId: user.id,
    score,
  });

  if (mockTestScore) {
    return res.status(201).json({
      status: true,
      payload: {
        mockTestScore,
        reward: user.rewards,
      },
    });
  }

  return res.status(500).json({
    status: false,
  });
};

export { createMockTestScore };
