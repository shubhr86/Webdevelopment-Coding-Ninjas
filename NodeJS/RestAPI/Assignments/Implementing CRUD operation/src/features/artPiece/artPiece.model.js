class ArtPiece {
  
  constructor(id,title, artist, year, imageUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.imageUrl = imageUrl;
   
  }

  // Create an art piece
  static add(artpiece) {
    artpiece.id = artPieces.length + 1; 
    artPieces.push(artpiece);
    return artpiece;
  }
  // Get all art pieces
  static getAll(year, artist) {
    const result = artPieces.filter((artPiece) => {
      return (
        (!year || artPiece.year >= year) &&
        (!artist || artPiece.artist === artist)
      );
    });
    return result;
  }

  // Get a specific art piece by ID
  static get(id) {
    const artPiece = artPieces.find((i) => i.id == id);
    return artPiece;
  }

  // Update the details of a specific art piece
  static updateArtPiece(id, title, artist, year, imageUrl) {
    const artPiece = artPieces.find((i) => i.id == id);
    if (artPiece) {
      artPiece.title = title;
      artPiece.artist = artist;
      artPiece.year = year;
      artPiece.imageUrl = imageUrl;

     return artPiece;
    }
    
  }

  // Delete a specific art piece by ID
  static deleteArtPiece(id) {
    const index = artPieces.findIndex((piece) => piece.id == id);
   // console.log(index);
  
    if (index !== -1) {
      const deletedArtPiece = artPieces.splice(index, 1)[0];
      //console.log(deletedArtPiece);
      return deletedArtPiece;
    }
    return null;
  }  
}

const artPieces = [
  new ArtPiece(1, "Art Piece 1", "Artist A", 2020, "image1.jpg"),
];
export default ArtPiece;
