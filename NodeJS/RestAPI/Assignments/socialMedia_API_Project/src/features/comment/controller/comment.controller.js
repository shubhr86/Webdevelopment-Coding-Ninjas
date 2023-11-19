
import CommentModel from "../model/comment.model.js";
import CustomError from "../../../middleware/customError.middleware.js";
import PostModel from "../../post/model/post.model.js";
export default class CommentController {
    createComment(req, res) {
        const postId = req.params.id;
        const userId = req.userId;
        const { content } = req.body;


        if (!content) {
            throw new CustomError(400, 'Comment content is required');
        }

        const comment = CommentModel.createComment(userId, postId, content);

        // Update the post's comments as well
        const postComments = CommentModel.getAllCommentsForPost(postId);

        // Find the corresponding post and add the comment
        const post = PostModel.getPostsbyId(postId);
        if (post) {
            post.comments.push(comment);
        }

        res.status(201).json({ comment, postComments });
    }

    getAllCommentsForPost(req, res) {
        const postId = req.params.id;
        const postComments = CommentModel.getAllCommentsForPost(postId);
        res.status(200).json(postComments);
    }

    updateComment(req, res) {
        const id = req.params.id;
        const { content } = req.body;

        const updatedComment = CommentModel.updateComment(id, content);
        if (updatedComment) {
            res.status(200).json(updatedComment);
        } else {
            throw new CustomError(400, "Comment Not found");
        }
    }

    deleteComment(req, res) {
        const postId = req.params.id; 
        const commentId = req.params.id;
    
    const deletedComment = CommentModel.deleteComment(postId, commentId);
     if (deletedComment) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            throw new CustomError(404, 'Comment Not found');
        }
    }
}
