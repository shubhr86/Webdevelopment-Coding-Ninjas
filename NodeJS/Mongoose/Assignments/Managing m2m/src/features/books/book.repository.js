// Make necessary imports here.
// Don't change the pre-written code.

import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { reviewSchema } from './review.schema.js';
import {authorSchema} from './author.schema.js';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

// creating author for review.

const authorModel = mongoose.model('Author', authorSchema);

export default class BookRepository {
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    async addReviewToBook(bookId, text, rating) {
        const reviewData = {
            text,
            rating,
            book: new mongoose.Types.ObjectId(bookId)
        }
        const review = new reviewModel(reviewData);
        const savedReview = await review.save();

        const book = await booksModel.findById(bookId);

        book.reviews.push(savedReview._id);

        await book.save();

        return savedReview;

    }

    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }

    async updateBookAvailability(bookId, quantity) {

        console.log(bookId);
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;

        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    // Complete the following four funtions.
    async createAuthor(authorData) { 
        const author = new authorModel(authorData);
        const savedAuthor = await author.save();
        return savedAuthor;
    }

    async addAuthorToBook(bookId, authorId) { 
        const book = await booksModel.findById(bookId);
        const author = await authorModel.findById(authorId);
    
        if (!book || !author) {
          return null; // Handle appropriately (e.g., throw an error)
        }
    
        book.authors.push(author._id);
        author.books.push(book._id);
    
        await book.save();
        await author.save();
    
        return { book, author };
    }

    async listAuthorsByBook(bookId) {
        const book = await booksModel.findById(bookId).populate('authors');
        return book ? book.authors : null;
     }

    async listBooksByAuthor(authorId) {
        const author = await authorModel.findById(authorId).populate('books');
        return author ? author.books : null;
     }
}