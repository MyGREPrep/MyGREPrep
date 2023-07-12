import {Request, Response} from "express";
import { User } from "src/entities/User";

const getReward = async (req: Request, res: Response) => {
    const user = await User.find({where: {id: req.body.userId}});

    if (!user) {
        return res.status(500).json({
            status: false,
            payload: {
                message: "User does not exist"
            }
        })
    }

    return res.status(200).json({
        status: true,
        payload: {
            reward: user[0].rewards
        }
    })
}

export {getReward}