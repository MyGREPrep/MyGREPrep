import { Request, Response } from "express";

const fetchScores = async (req: Request, res: Response) => {
    const dataSource = req.app.locals.context.dataSource;

    const mockTestScoreIds = await dataSource.query(
        `
            select u.id, m.score
            from user u
            inner join mocktestscore m on u.id = m."userId"
        `,
        []
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