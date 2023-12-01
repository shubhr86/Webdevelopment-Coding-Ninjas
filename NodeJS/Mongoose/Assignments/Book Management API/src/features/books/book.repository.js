import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'


const bookModel= mongoose.model('Book',bookSchema);

export default class BookRepository {


    // -----Change code in below functions only-----

    //book creation
    async createBook(bookData) {
        try{
            const newBook = await bookModel.create(bookData);
            return newBook;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    //filtering the book by id
    async getOne(id) {
        try{
            const book= await bookModel.findById(id);
            if (!book){
                throw {status :404,message: 'Book Not found'};
               
            }
            return book;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}