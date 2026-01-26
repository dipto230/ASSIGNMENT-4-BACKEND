import { Request, Response } from "express";
import { postService } from "./seller.service";


const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.medicinePost(req.body)
        res.status(201).json(result)
        
    } catch (e) {
        res.status(400).json({
            error: "Medicine creation failed",
            details:e
        })
    }
}

export const PostController = {
    createPost
}