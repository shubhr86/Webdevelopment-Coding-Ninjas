import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.route.js";
import likeRouter from "./src/features/like/like.route.js";
import friendShipRouter from "./src/features/friend/friendship.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import cookieParser from "cookie-parser";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/friends", friendShipRouter);
app.use("/api/otp", otpRouter);

app.use(appLevelErrorHandlerMiddleware);

export default app;
