import express  from 'express';
import PostController from '../controller/post.controller.js'
import jwtAuth from '../../../middleware/jwt.middleware.js';
import upload from '../../../middleware/upload.middleware.js';
const postRouter = express.Router();
const postController= new PostController();



// sort

postRouter.get('/sorting', postController.getSortedPosts);

// pagination

postRouter.get('/paginate', jwtAuth, postController.getPaginatedPosts);

// filter Posts

// Add the following route in post.routes.js
postRouter.get('/filter', jwtAuth, postController.getPostsByCaption);


// get all posts

postRouter.get('/all',postController.getAllPosts);


//get post by specific Id

postRouter.get('/:id', postController.getPostById);

// get user specific posts

postRouter.get('/',jwtAuth, postController.getPostsByUser)


// create post 

postRouter.post('/',jwtAuth,upload.single('imageUrl'), postController.createPost);
// delete post

postRouter.delete('/:id',jwtAuth,postController.deletePost);

// update

postRouter.put('/:id', jwtAuth,upload.single('imageUrl'), postController.updatePost);

// Draft
postRouter.post('/draft', jwtAuth, upload.single('imageUrl'), postController.savePostAsDraft);
postRouter.put('/archive/:id', jwtAuth, postController.archivePost);


// bookmark

postRouter.put('/bookmark/:id', jwtAuth, postController.bookmarkPost);



export default postRouter;