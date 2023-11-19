import express from "express";
import ArtPieceController from "./artPiece.controller.js";
import upload from '../../middlewares/upload.Middleware.js'

const router = express.Router();
const artPieceController = new ArtPieceController();

// Retrieve all art pieces
router.get("/", artPieceController.getAllArtPieces);

// Create a new art piece
router.post("/", upload.single("imageUrl"), artPieceController.createArtPiece);

// Retrieve a specific art piece by ID
router.get("/:id", artPieceController.getOneArtPiece);

// Update a specific art piece by ID
router.post("/:id", upload.single("imageUrl"), artPieceController.updateArtPiece);

// Delete a specific art piece by ID
router.delete("/:id", artPieceController.deleteArtPiece);

export default router;
