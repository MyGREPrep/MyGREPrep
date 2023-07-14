import { Request, Response } from "express";

type MockTestScores = {
  id: number;
  score: number;
};

const fetchScores = async (req: Request, res: Response) => {
  const dataSource = req.app.locals.context.dataSource;

  const mockTestScores: MockTestScores[] = await dataSource.query(
    `
            select u.name, m.score
            from "user" u
            inner join mocktestscore m
            on u.id = m."userId"
            order by m.score desc
        `,

    []
  );

  const newMockTestScores: MockTestScores[] = [];

  mockTestScores.forEach((item) => {
    if (newMockTestScores.findIndex((x) => x.id === item.id) === -1) {
      newMockTestScores.push(item);
    }
  });

  res.status(500).json({
    status: true,
    payload: {
      mockTestScores: newMockTestScores,
    },
  });
};

export { fetchScores };
