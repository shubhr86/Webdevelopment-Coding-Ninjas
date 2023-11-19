import express from "express";
import bodyParser from 'body-parser';
import userRouter from "./src/features/user/routes/user.routes.js";
import postRouter from "./src/features/post/routes/post.routes.js";
import {errorHandlerMiddleware} from './src/middleware/errorHandler.Middleware.js'
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import commentRouter from "./src/features/comment/routes/comment.route.js";
import likeRouter from "./src/features/like/route/like.route.js";  
const app = express();

//  use
app.use(express.json());
app.use(bodyParser.json());
app.use(loggerMiddleware);

// user routes
app.use('/api/user', userRouter);

// post 
app.use('/api/posts',postRouter);

// comment
app.use('/api/comments',commentRouter)


// like
app.use('/api/likes', likeRouter);

app.use(errorHandlerMiddleware);

export default app;
