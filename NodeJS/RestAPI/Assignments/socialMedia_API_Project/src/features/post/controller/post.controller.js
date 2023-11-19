import PostModel from "../model/post.model.js";
import CustomError from "../../../middleware/customError.middleware.js";

export default class PostController{

    createPost (req,res){
        const { caption } = req.body;
        const userId=req.userId;
        //console.log(userId);
        // throw error if not found\
        if (!caption || !userId){
            throw new CustomError(400,"UserId and caption required");
        }
        const newPost={
            userId,
            caption,
            imageUrl:req.file.filename,
        }
        const post = PostModel.createPost(newPost);
        res.status(201).send(post);
    }
    getAllPosts(req,res){
        const posts= PostModel.getAllPosts();
        res.status(200).json(posts);
    };
    getPostById (req,res){
        const id= req.params.id;
        const post = PostModel.getPostsbyId(id);
        if (post){
            res.status(200).json(post);
        }else {
            throw new CustomError(400,"Post Not found");
        }
    };

    getPostsByUser(req, res) {
        const userId = req.userId;
        if (!userId) {
            throw new CustomError(400, "UserId required");
        }
    
        const userPosts = PostModel.getPostsByUser(userId);
    
        if (userPosts.length === 0) {
            throw new CustomError(404, "No posts found for this user");
        }
    
        res.status(200).json(userPosts);
    }
    

    updatePost(req, res) {
        const id = req.params.id;
        const { caption } = req.body;
       // console.log(req.body)
        const imageUrl = req.file ? req.file.filename : null;
    
        const updatePost = PostModel.updatePost(id, caption, imageUrl);
        if (updatePost) {
            res.status(200).json(updatePost);
        } else {
            throw new CustomError(400, "Post Not found");
        }
    }
    
    deletePost(req, res) {
        const id = req.params.id;
        const post = PostModel.getPostsbyId(id); // Check if the post exists
        if (!post) {
            throw new CustomError(404, 'Post not found');
        }
    
        // Ensure that the user making the request is the owner of the post
        if (post.userId !== req.userId) {
            throw new CustomError(403, 'You are not authorized to delete this post');
        }
    
        const deleted = PostModel.deletePost(id);
        if (deleted) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } 
        
        else {
            throw new CustomError(400, 'Already deleted');
        }
    }
    


    commentonPost(req,res){
        const id= req.params.id;
        const userId= req.userId;
        const {content} = req.body;

        if (!content){
            res.status(400).json({error:'comment content is required'});
            return;
        }
        const comment= PostModel.commentoOnPost(id, userId, content);

        if (comment){
            res.status(201).json(comment);
        }else {
            res.status(400).json({error: "failed to add comment"});
        }
    }

    getPostsByCaption(req, res) {
        const { caption } = req.query;
        if (!caption) {
            throw new CustomError(400, 'Caption is required for filtering posts.');
        }
    
        const filteredPosts = PostModel.getPostsByCaption(caption);
        res.status(200).json(filteredPosts);
    }
    savePostAsDraft(req, res) {
        const { caption } = req.body;
        const userId = req.userId;
    
        if (!caption || !userId) {
            throw new CustomError(400, 'UserId and caption are required');
        }
    
        const newPost = {
            userId,
            caption,
            imageUrl: req.file.filename,
        };
    
        const post = PostModel.saveAsDraft(newPost);
        res.status(201).json(post);
    }
    
    archivePost(req, res) {
        const id = req.params.id;
        const archived = PostModel.archivePost(id);
    
        if (archived) {
            res.status(200).json({ message: 'Post archived successfully' });
        } else {
            throw new CustomError(404, 'Post not found');
        }
    }

    getSortedPosts(req, res) {
        try {
            const sortedPosts = PostModel.sortPostsByEngagement();
            res.status(200).json(sortedPosts);
        } catch (error) {
            console.error("Error getting sorted posts:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    bookmarkPost(req, res) {
        const userId = req.userId;
        const id = req.params.id;
        const bookmarked = PostModel.bookmarkPost(userId, id);
    
        if (bookmarked) {
            res.status(200).json({ message: 'Post bookmarked successfully' });
        } else {
            throw new CustomError(404, 'Post not found');
        }
    }
    getPaginatedPosts(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        const paginatedPosts = PostModel.getPaginatedPosts(page, pageSize);
        res.status(200).json(paginatedPosts);
    }
    
    

}