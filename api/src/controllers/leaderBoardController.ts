/* eslint-disable */
import { Request, Response } from "express";
import { dataSource } from "../utils/typeORMConfig";
import { User } from "src/entities/User";
import { MockTest } from "src/entities/MockTest";
import { TestScore } from "src/entities/TestScore";

const chooseMockTestId = async (req: Request, res: Response) => {
  const MockTestId = await MockTest.findOne({
    where: { MockTestId: req.body.MockTestId },
  });

  if (!MockTestId) {
    return res.status(201).json({
      status: true,
    });
  }
};

const getMockTestScore = async (req: Request, res: Response) => {
  try {
    const mockTestId = req.body.MockTestId;
    // query the db to fetch the score
    const mockScores: userscores[] = await dataSource.query(
      `
      SELECT u.id, u.name, t.score 
      FROM User u
      JOIN TestScore t ON u.id = t.userid
      WHERE t.mocktestid = $1
      ORDER BY t.score DESC;
      `,
      [MockTestId]
    );

    return res.json(mockScores);
  } catch (error) {
    console.error("Error in fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
