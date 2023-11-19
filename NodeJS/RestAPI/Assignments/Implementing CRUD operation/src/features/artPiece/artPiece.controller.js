import ArtPiece from "./artPiece.model.js";

export default class ArtPieceController {
  // Get all art pieces
  getAllArtPieces(req, res) {
    const { year, artist } = req.query;
    const artPieces = ArtPiece.getAll(year, artist);
    res.status(200).json(artPieces);
  }

  // Get a specific art piece by ID
  getOneArtPiece(req, res) {
    const id = req.params.id;
    const artPiece = ArtPiece.get(id);
    if (!artPiece) {
      res.status(404).send("Art piece not found");
    } else {
      res.status(200).json(artPiece);
    }
  }

  // Create a new art piece
  createArtPiece(req, res) {
    const { title, artist, year } = req.body;
    const newArtPiece = {
      title,
      artist,
      year,
      imageUrl: req.file.filename,
    };
    const createdArtPiece = ArtPiece.add(newArtPiece);
    res.status(201).json(createdArtPiece);
  }

  // Update a specific art piece by ID
  updateArtPiece(req, res) {
    const id = req.params.id;
    const { title, artist, year } = req.body;
    const imageUrl = req.file ? req.file.filename : null;
    const updatedArtPiece = ArtPiece.updateArtPiece(id, title, artist, year, imageUrl);

    if (updatedArtPiece) {
      res.status(200).json(updatedArtPiece);
    } else {
      res.status(404).send("Art piece not found");
    }
  }


  // Delete a specific art piece by ID
  deleteArtPiece(req, res) {
    const id = req.params.id;
   // console.log(id);
    const deletedArtPiece = ArtPiece.deleteArtPiece(id);

    if (deletedArtPiece) {
      res.status(204).send(); 
    } else {
      res.status(404).send("Art piece not found");
    }
  }
}
