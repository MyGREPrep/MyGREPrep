import { Request, Response } from "express";
import { Topic } from "../entities/Topic";
import { Option } from "../entities/Option";
import { Question } from "../entities/Question";

const createTopic = async (req: Request, res: Response) => {
  const type = req.body.type;
  const description = req.body.description;
  const significance = req.body.significance;
  const videoUrl = req.body.videoUrl;

  const topicCreated = await Topic.create({
    type,
    description,
    significance,
    videoUrl,
  }).save();

  return res.status(201).json({
    status: true,
    payload: {
      topic: topicCreated,
    },
  });
};

const getTopic = async (req: Request, res: Response) => {
  const topicType = req.body.topic;
  const dataSource = req.app.locals.context.dataSource;

  const topic = await Topic.find({ where: { type: topicType } });

  const quizQuestionIds = await dataSource.query(
    `
            select q.id
            from question q
            where q."topicType" = $1
            order by random() limit 3
        `,
    [topicType]
  );

  const quizQuestionsWithOptions: any = [];

  for (const q of quizQuestionIds) {
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

    console.log(optionStrings);

    const questionWithOption = {
      description: question["0"].description,
      question: question["0"].question,
      sectionType: question["0"].sectionType,
      correctOption,
      options: optionStrings,
    };

    // const questionWithOption = { ...question["0"], options: [...options] };
    quizQuestionsWithOptions.push(questionWithOption);
  }

  const newTopicWithQuestions = {
    id: topic[0].id,
    type: topic[0].type,
    description: topic[0].description,
    significance: topic[0].significance,
    videoUrl: topic[0].videoUrl,
    quiz: quizQuestionsWithOptions,
  };

  return res.status(201).json({
    status: 201,
    payload: {
      topic: newTopicWithQuestions,
    },
  });
};

export { createTopic, getTopic };
