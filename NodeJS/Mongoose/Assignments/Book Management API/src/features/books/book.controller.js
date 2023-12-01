import mongoose from 'mongoose';
import BookRepository from "./book.repository.js";

export default class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    //------change code in below functions only--------

    // creation of book
    createBook = async (req, res) => {
        try{
            const {body}= req;
            const newBook= await this.bookRepository.createBook(body);
            res.status(201).send(newBook);
        }catch(err){
            console.log(err);
            res.status(404).send('Not Found');
        }
     }

    // filtering of book by id
    getOne = async (req, res) => { 
        try{
            const {bookId}= req.params;
           // console.log(req.params);
            const book= await this.bookRepository.getOne(bookId);
            res.status(200).send(book);
        } catch (error) {
            if (error.status === 404) {
              res.status(404).send(error.message);
            } else {
              console.error(error);
              res.status(404).send('Book not found.'); 
            }
          }
    }

}
