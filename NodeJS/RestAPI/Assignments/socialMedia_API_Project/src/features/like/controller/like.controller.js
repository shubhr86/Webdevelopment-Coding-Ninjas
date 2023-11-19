// like.controller.js

import LikeModel from '../model/like.model.js';
import CustomError from '../../../middleware/customError.middleware.js';
import PostModel from '../../post/model/post.model.js';
export default class LikeController {

    
        addLike(req, res) {
            const postId = req.params.postId;
            const userId = req.userId;
            const { likescount } = req.body;
    
            if (!likescount) {
                throw new CustomError(400, 'Likes Count Required');
            }
    
            const like = LikeModel.addLike(userId, postId, likescount);
    
            // update in post
            const post = PostModel.getPostsbyId(postId);
            post.likes.push(like);
    
            res.status(201).json({ like, post });
        }
    

    removeLike(req,res){
        const postId = req.params.postId; 
        const userId = req.userId;
        const deleteLike= LikeModel.deleteLike(postId,userId);
        if (deleteLike){
            res.status(200).json({message: 'Unliked Sucessfully'})
        }else {
            throw new CustomError(400, 'Like not found');
        }
    }

    getAllLikesForPost(req, res) {
        const postId = req.params.postId;
        const likes = LikeModel.getAllLikesForPost(postId);
        res.status(200).json(likes);
    }

    toggleLikeForPost(req, res) {
        const userId = req.userId;
        const postId = req.params.postId;
        const isLiked = LikeModel.removeLike(userId, postId);

        if (!isLiked) {
            LikeModel.addLike(userId, postId);
        }

        const likes = LikeModel.getAllLikesForPost(postId);
        res.status(200).json(likes);
    }
}
