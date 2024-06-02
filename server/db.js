const mongoose = require("mongoose");

mongoose.connect("")

const taskDbSchema = new mongoose.Schema({
    "title": String,
    "description": String,
    "completed": String
});

const Task = mongoose.model("Task", taskDbSchema);

module.exports ={
    Task
}