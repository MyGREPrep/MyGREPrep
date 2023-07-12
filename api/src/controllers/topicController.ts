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

    const topic = await Topic.find({where: {type: topicType}})

    return res.status(201).json({
        status: 201,
        payload: {
            topic: topic
        }
    })
}

export {
    createTopic,
    getTopic
}