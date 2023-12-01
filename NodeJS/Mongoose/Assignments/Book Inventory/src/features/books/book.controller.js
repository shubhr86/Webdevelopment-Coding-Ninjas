//-----------pre-written code starts----------
import BookRepository from "./book.repository.js";

export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  //book creation
  createBook = async (req, res) => {
    const { title, author, genre, copies, availableCopies } = req.body;
    try {
      const bookData = {
        title,
        author,
        genre,
        copies,
        availableCopies,
      };
      await this.bookRepository.createBook(bookData);
      res.status(201).json(bookData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create a new book" });
    }
  };

  //filtering the book by id
  getOne = async (req, res) => {
    const { bookId } = req.params;
    console.log(bookId);

    try {
      const book = await this.bookRepository.getOne(bookId);
      if (!book) {
        res.status(404).send("book  not found.");
      } else {
        res.status(200).send(book);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to find book" });
    }
  };

  //---------------pre-written code ends-----------------

  // Complete the functions below:

  //filtering the books based on genre
  listBooksByGenre = async (req, res) => {
    
      const {genre}= req.params;
      console.log(genre);
      try {
        const book = await this.bookRepository.listBooksByGenre(genre);
          res.status(200).json(book);
        
    }catch(err){
      console.log(err);
      res.status(500).json({ error: "Failed to find genere" });
    }
  };

  //increasing the count of available books
  updateBookAvailability = async (req, res) => {

    const {bookId}= req.params;
    const {quantity}= req.body;

    try{

      const updateBook= await this.bookRepository.updateBookAvailability(bookId,quantity);
      res.status(200).json(updateBook);

    }catch(err){
      console.log(err);
      res.status(500).json({ error: "Failed to update Book" });
    }

  };

  //deletion of book
  deleteBook = async (req, res) => {

    const {bookId}= req.params;
    try{
      const result = await this.bookRepository.deleteBookById(bookId);
      if (result){
        res.status(200).json({message:'Book deleted'})
      }else {
        res.status(400).json({message:'Book not  found'})

      }
    }catch(err){
      console.log(err);
      res.status(500).json({ error: "Failed to find genere" });
    }
  };
}
