import { Request, Response } from "express";
import { Question } from "../entities/Question";
import { Option } from "../entities/Option";

const createQuestion = async (req: Request, res: Response) => {
  const description = req.body.description;
  const question = req.body.question;
  const sectionType = req.body.sectionType;

  const questionCreated = await Question.create({
    description,
    sectionType,
    question,
  }).save();

  return res.status(201).json({
    status: true,
    payload: {
      question: questionCreated,
    },
  });
};

const createOption = async (req: Request, res: Response) => {
  const option = req.body.option;
  const questionId = req.body.questionId;
  const isCorrect = req.body.isCorrect;

  let optionCreated;

  try {
    optionCreated = await Option.create({
      option,
      questionId,
      isCorrect,
    }).save();
  } catch (error) {
    if (error.code === "23503") {
      res.status(500).json({
        status: false,
        payload: {
          message: "The questionId does not exist",
        },
      });
    }
  }

  return res.status(201).json({
    status: true,
    payload: {
      option: optionCreated,
    },
  });
};

const getQuestionIds = async (req: Request, res: Response) => {
  const sectionType = req.body.sectionType;
  const dataSource = req.app.locals.context.dataSource;

  const questionIds = await dataSource.query(
    `
        select q.id
        from question q
        where "sectionType" = $1
    `,
    [sectionType]
  );

  const ids = questionIds.map((item: { id: number }) => item.id);

  return res.status(201).json({
    status: true,
    payload: { questionIds: ids },
  });
};

const getQuestion = async (req: Request, res: Response) => {
  const questionId = req.body.questionId;

  const question = await Question.find({ where: { id: questionId } });
  const options = await Option.find({ where: { questionId } });
  const questionWithOption = { ...question["0"], options: [...options] };

  return res.status(201).json({
    status: 201,
    payload: {
      question: questionWithOption,
    },
  });
};

const options = async (_: Request, res: Response) => {
  const options = await Option.find({});

  return res.status(201).json({
    options,
  });
};

const verifyAnswer = async (req: Request, res: Response) => {
  const questionId = req.body.questionId; 
  const selectedAnswer = req.body.selectedAnswer; 
  const options = await Option.find({ where: { questionId } });
  
  options.forEach((option)=>{
    if(option.isCorrect===true && selectedAnswer === option.option){
      return res.status(201).json({
        status: true,
      });
    }
  })

  return res.status(500).json({
    status: false,
  });
}

const generateMockTest = async (req: Request, res: Response) => {
  const dataSource = req.app.locals.context.dataSource;

  const questionIds = await dataSource.query(
    `
            select q.id
            from question q
            order by random() limit 10
        `,
    []
  );

  const questionsWithOptions: any = [];

  for (const q of questionIds) {
    const question = await Question.find({ where: { id: q.id } });
    const options = await Option.find({ where: { questionId: q.id } });

    const optionStrings = [];
    let correctOption;

    for (const o of options) {
      if (o.isCorrect) {
        correctOption = o.option;
      }
      optionStrings.push(o.option);
    }

    const questionWithOption = {
      description: question["0"].description,
      question: question["0"].question,
      sectionType: question["0"].sectionType,
      correctOption,
      options: optionStrings,
    };

    questionsWithOptions.push(questionWithOption);
  }

  return res.status(201).json({
    status: true,
    payload: {
      questions: questionsWithOptions,
    },
  });
};

export {
  createQuestion,
  getQuestionIds as questionIds,
  createOption,
  options,
  getQuestion,
  verifyAnswer,
  generateMockTest,
};
