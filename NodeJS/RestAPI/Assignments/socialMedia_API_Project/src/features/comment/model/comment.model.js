// comment.model.js
import PostModel from "../../post/model/post.model.js";

export default class CommentModel {
    constructor(id, userId, postId, content) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static createComment(userId, postId, content) {
        const comment = new CommentModel(comments.length + 1, userId, postId, content);
        comments.push(comment);
        return comment;
    }

    static getAllCommentsForPost(postId) {
        return comments.filter((comment) => comment.postId == postId);
    }

    static updateComment(id, content) {
        const comment = comments.find((c) => c.id == id);
        if (comment) {
            comment.content = content;
            return comment;
        }
    }
        static deleteComment(postId, commentId) {
            const post = PostModel.getPostsbyId(postId);
    
            if (!post) {
                throw new CustomError(404, 'Post not found');
            }
            // console.log("commentId",commentId);
            // console.log("postId",postId);
       


            const commentIndex = post.comments.findIndex((comment) => String(comment.id) == String(commentId));
         //   console.log("commentIndex",commentIndex);
            if (commentIndex !== -1) {
                post.comments.splice(commentIndex, 1);
                return true;
            }
    
            return false;
        }
    }


const comments = [];
