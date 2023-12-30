import ExpenseModel from "./expense.model.js";
import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    const { title, amount, date, isRecurring, tags } = req.body;

    const expenseToCreate = new ExpenseModel(
      title,
      amount,
      date,
      isRecurring,
      tags
    );

    try {
      await this.expenseRepository.addExpense(expenseToCreate);
      res.status(201).send(expenseToCreate);
    } catch (err) {
      res.status(500).send("Error creating expense.");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await this.expenseRepository.getOne(id);

      if (!expense) {
        res.status(404).send("Expense not found.");
      } else {
        res.status(200).send(expense);
      }
    } catch (err) {
      res.status(500).send("Error retrieving expense.");
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.getAllExpenses();
      res.status(200).send(expenses);
    } catch (err) {
      res.status(500).send("Error retrieving expenses.");
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;

    try {
      await this.expenseRepository.addTagToExpense(id, tag);
      res.status(200).send("Tag added successfully.");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error adding tag to expense.");
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try {
      const expenses = await this.expenseRepository.filterExpenses(req.query);
      res.status(200).send(expenses);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error filtering expenses.");
    }
  };

  // Update an expense's tag
  updateTag = async (req, res) => {
    try {
      const { id } = req.params;
      const { oldTag, newTag } = req.body;
      await this.expenseRepository.updateTagInExpense(id, oldTag, newTag);
      res.status(200).send("Tag updated successfully.");
    } catch (error) {
      res.status(500).send("Error updating tag.");
    }
  };

  // Delete a tag from an expense
  deleteTag = async (req, res) => {
    try {
      const { id, tag } = req.params;
      await this.expenseRepository.deleteTagFromExpense(id, tag);
      res.status(200).send("Tag deleted successfully.");
    } catch (error) {
      res.status(500).send("Error deleting tag.");
    }
  };

  // -----------Above is previous code-------------

  // Aggregate total revenue for each product
  aggregateTotalRevenue = async (req, res) => {
    try {
      const result = await this.expenseRepository.aggregateTotalRevenue();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Error aggregating total revenue.");
    }
  };

  // Group expenses by tags
  groupExpensesByTags = async (req, res) => {
    try {
      const result = await this.expenseRepository.groupExpensesByTags();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Error grouping expenses by tags.");
    }
  };

  // Group and calculate average by recurring status
  groupAndCalculateAvgByRecurring = async (req, res) => {
    try {
      const result = await this.expenseRepository.groupAndCalculateAvgByRecurring();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Error grouping and calculating average by recurring status.");
    }
  };

}

//No need to change the previous code

import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  //----------------previous code starts------------------------

  // Create a new expense
  async addExpense(expense) {
    const db = getDB();
    console.log(expense);
    await db.collection(this.collectionName).insertOne(expense);
    return expense;
  }

  // Get one expnese by its ID
  async getOne(id) {
    const db = getDB();
    const expense = await db
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(id) });
    return expense;
  }

  // Get all expenses
  async getAllExpenses() {
    const db = getDB();
    const expenses = await db.collection(this.collectionName).find().toArray();
    return expenses;
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    const db = getDB();
    const result = await db
      .collection(this.collectionName)
      .updateOne({ _id: new ObjectId(id) }, { $push: { tags: tag } });
    return result;
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    const db = getDB();
    let query = {};

    if (criteria.minAmount || criteria.maxAmount) {
      query.amount = {};

      if (criteria.minAmount) {
        query.amount.$gte = parseFloat(criteria.minAmount);
      }

      if (criteria.maxAmount) {
        query.amount.$lte = parseFloat(criteria.maxAmount);
      }
    }

    if (criteria.isRecurring !== undefined) {
      query.isRecurring = criteria.isRecurring === "true";
    }

    const expenses = await db
      .collection(this.collectionName)
      .find(query)
      .toArray();
    return expenses;
  }

  // Update a tag in an expense
  async updateTagInExpense(id, oldTag, newTag) {
    const db = getDB();
    const filter = { _id: new ObjectId(id), tags: oldTag };
    const update = { $set: { "tags.$": newTag } };
    const expenses = await db.collection(this.collectionName).updateOne(filter, update);
    return expenses;

  }

  // Delete a tag from an expense
  async deleteTagFromExpense(id, tag) {

    const db = getDB();
    const filter = { _id: new ObjectId(id) };
    const update = { $pull: { tags: tag } };
    await db.collection(this.collectionName).updateOne(filter, update);

  }

  //------------------previous code ends------------------------

  // Only change the below functions

    // Aggregate total revenue for each product
    async aggregateTotalRevenue() {
      const db = getDB();
      const pipeline = [
        {
          $group: {
            _id: "$title",  // Change this line to match the existing expectation
            totalRevenue: { $sum: "$amount"} 
          }
        },
      ];
    
      const result = 
      await db.collection(this.collectionName).aggregate(pipeline).toArray();
      //console.log(result)
      return result;
    }
    // Group expenses by tags
    async groupExpensesByTags() {
      const db = getDB();
      const pipeline = [
  
        { $group: { _id: "$tags", expenses: { $push: { _id: "$_id", title: "$title", amount: "$amount", date: "$date", isRecurring: "$isRecurring", tags: "$tags" } } } }

      ];
  
      const result = await db.collection(this.collectionName).aggregate(pipeline).toArray();
      return result;
    }
  
    // Group and calculate average by recurring status
    async groupAndCalculateAvgByRecurring() {
      const db = getDB();
      const pipeline = [
        {
          $group: {
            _id: "$isRecurring",
            avgAmount: { $avg: "$amount" }
          }
        }
      ];
  
      const result = await db.collection(this.collectionName).aggregate(pipeline).toArray();
      return result;
    }
}


