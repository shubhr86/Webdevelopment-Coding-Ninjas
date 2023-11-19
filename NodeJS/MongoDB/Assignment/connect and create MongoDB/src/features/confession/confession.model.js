// confession.model.js

import { getDB } from '../../config/mongodb.js';

export default class ConfessionModel {
  constructor(title, body, author) {
    this.title = title;
    this.body = body;
    this.author = author;
  }

  static async create(title, body, author) {
    try {
      // Ensure that the MongoDB connection is established before proceeding
      const db= getDB();
      const collection = db.collection('confessions');
      const newConfession = new ConfessionModel(title, body, author);
      await collection.insertOne(newConfession);

      return newConfession;
    } catch (err) {
      console.error('Error in create method:', err.message);
      throw new Error(err.message);
    }
  }
}
