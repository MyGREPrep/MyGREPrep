import { Request, Response } from "express";

const fetchScores = async (req: Request, res: Response) => {
    const dataSource = req.app.locals.context.dataSource;

    const mockTestScoreIds = await dataSource.query(
        `
            SELECT m.score, u.userId
            FROM "MockTestScore" m
            INNER JOIN user u ON u.id = m.userId
            ORDER BY m.score DESC

        `
    );

    res.status(500).json({
        status: true,
        payload: {
            mockTestScoreIds
        }
    })
}

export {
    fetchScores
}