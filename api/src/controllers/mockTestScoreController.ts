import { Request, Response } from "express";
import { Mocktestscore } from "../entities/MockTestScore";

const createMockTestScore = async (req: Request, res: Response) => {
    const score = req.body.score;
    const userId = req.body.userId;

    const mockTestScore = await Mocktestscore.save({
        userId,
        score
    })

    if (mockTestScore) {
        return res.status(500).json({
            status: true,
            payload: {
                mockTestScore
            }
        })
    }

    return res.status(201).json({
        status: false,
    })
}

export {
    createMockTestScore
}