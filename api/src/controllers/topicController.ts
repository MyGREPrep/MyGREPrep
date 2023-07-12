import { Request, Response } from "express";
import { Topic } from "../entities/Topic";

const createTopic = async (req: Request, res: Response) => {
    const type = req.body.type;
    const description = req.body.description;
    const significance = req.body.significance;
    const videoUrl = req.body.videoUrl;

    const topicCreated = await Topic.create({
        type,
        description,
        significance,
        videoUrl
    }).save();

    return res.status(201).json({
        status: true,
        payload: {
            topic: topicCreated
        }
    })
}

const getTopic = async (req: Request, res: Response) => {
    const topicType = req.body.topic;
    const dataSource = req.app.locals.context.dataSource;

    const topic = await Topic.find({where: {type: topicType}})

    const quizQuestions  = await dataSource.query(
        `
            select q.* 
            from question q
            order by random() limit 5
            where topicType = $1
        `,
        [topicType]
      );

      const newTopicWithQuestions = {
        ...topic,
        quiz: quizQuestions
      }

    return res.status(201).json({
        status: 201,
        payload: {
            topic: newTopicWithQuestions
        }
    })
}

export {
    createTopic,
    getTopic
}