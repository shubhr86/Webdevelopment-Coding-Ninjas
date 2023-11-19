import express from "express";
import ArtPeiceRouter from "./src/features/artPiece/artPiece.routes.js";
const app = express();

// TODO: require your artPieceRoutes here

app.use(express.json());

// TODO: use your artPieceRoutes with a proper endpoint
app.use("/api/artPieces",ArtPeiceRouter);


export default app;
