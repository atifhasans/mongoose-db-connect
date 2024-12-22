import Todos from "../models/todos.models.js"; 
import mongoose from "mongoose"

// Add a new Todo
const addTodo = async (req, res) => {
    try {
        const todos = req.body; // Expecting an array of todos
        if (!Array.isArray(todos)) {
            return res.status(400).json({ message: "Input should be an array of todos." });
        }

        const createdTodos = await Todos.insertMany(todos); // Insert multiple todos
        res.status(201).json({
            message: "Todos added successfully",
            data: createdTodos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding todos",
            error: error.message
        });
    }
};

// Get all Todos
const getAllTodo = async (req, res) => {
    try {
        const todos = await Todos.find(); // Fetch all documents
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
    }
};

// Get a single Todo by ID
const getSingleTodo = async (req, res) => {
    try {
        const todo = await Todos.findById(req.params.id); // Fetch by ID
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todo", error });
    }
};

// Delete a Todo by ID
const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todos.findByIdAndDelete(req.params.id); // Delete by ID
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted", deletedTodo });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo", error });
    }
};

// Edit a Todo by ID
const editTodo = async (req, res) => {
    try {
        const updatedTodo = await Todos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return updated document and validate
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error editing todo", error });
    }
};

export { addTodo, getAllTodo, getSingleTodo, deleteTodo, editTodo };
