// like.model.js
import CustomError from "../../../middleware/customError.middleware.js";
import PostModel from "../../post/model/post.model.js";
export default class LikeModel {
    constructor(id, userId, postId,likescount) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.likescount= likescount;
    }

    static addLike(userId, postId,likescount) {
        const post = PostModel.getPostsbyId(postId);

        if (!post) {
            throw new CustomError(404, 'Post not found');
        }

        // Check if the user has already liked the post
        const existingLike = post.likes.find((like) => like.userId === userId);

        if (existingLike) {
            throw new CustomError(400, 'You already liked the post');
        }

        // If not, add the like
        const like = new LikeModel(likes.length + 1, userId, postId, likescount);
        likes.push(like);

        return like;
    
    }

    static removeLike(userId, postId) {
        const post =PostModel.getPostsbyId(postId);
        if (!post){
            throw new CustomError(404,"Like Not found");
        }
        const index = post.likes.findIndex((like) => like.userId === userId && like.postId === postId);
        if (index !== -1) {
            likes.splice(index, 1);
            return true;
        }
        return false;
    }
    static deleteLike (postId, userId){
        const post = PostModel.getPostsbyId(postId);

        if (!post){
            throw new CustomError(400, 'Like not found')
        }
        const likeIndex= post.likes.findIndex((c)=> c.id== userId)

        if (likeIndex !==-1){
            post.likes.splice(likeIndex,1);
            return true;
        }
        return false;
    }

    static getAllLikesForPost(postId) {
        return likes.filter((like) => like.postId === postId);
    }
}

const likes = [];
