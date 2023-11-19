import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {

    try{
      const db= getDB();
      const collection=db.collection(this.collectionName);
      await collection.insertOne(expense);
      return expense;
    }catch(err){
      console.log("Error in add expense",err);
    }

  }

  // Get one expnese by its ID
  async getOne(id) {
    try{
      const db= getDB();
      const collection= db.collection(this.collectionName);
      return await collection.findOne({_id:new ObjectId(id)});
    }catch(err){
      console.log("err in get by id",err);
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db= getDB();
      const collection= db.collection(this.collectionName);
      const expenses= await collection.find().toArray();
      console.log(expenses);
      return expenses;
    }catch(err){
      console.log("error in get all expenses", err);
    }
  }

  // Add tag to an expense
  // async addTagToExpense(id, tag) {
  //   try{
  //   const db = getDB();
  //   const result = await db.collection(this.collectionName).updateOne(
  //     { _id: new ObjectId(id) },
  //     { $push: { tags: tag } }
  //   );
  //   if (result.modifiedCount > 0) {
  //     return await this.getOne(id);
  //   } else {
  //     throw new Error('Expense not found or tag not added.');
  //   }
  // }catch(err){
  //     console.log("err in tag", err);
  //   }
  // }
  async addTagToExpense(id, tag) {
    try{
    const db = getDB();
    const result = await db.collection(this.collectionName).updateOne(
      { _id: new ObjectId(id) }, 
      { $push: { tags: tag } }
    );

      return await result;
     } catch(err) {
      console.log("err in tag", err);    }
  }
  

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    const db = getDB();
    const filter = {};
  
    if (criteria.minAmount !== undefined) {
      filter.amount = { $gte: parseFloat(criteria.minAmount) };
    }
  
    if (criteria.maxAmount !== undefined) {
      filter.amount = { ...filter.amount, $lte: parseFloat(criteria.maxAmount) };
    }
  
    if (criteria.isRecurring !== undefined) {
      filter.isRecurring = criteria.isRecurring === 'true';
    }
  
    return await db.collection(this.collectionName).find(filter).toArray();
  }
  
}

export default ExpenseRepository;
