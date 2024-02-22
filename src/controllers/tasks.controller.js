const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const TaskService = require("../services/tasks.service");

const TaskServiceInstance = new TaskService();

// * Get all Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskServiceInstance.getAllTasks();
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// * Add a task
const addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await TaskServiceInstance.addTask(title, description);
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

//  * Update Task Status
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  try {
    // *Toggle the completion status
    const updatedTask = await TaskServiceInstance.updateTask(id);
    res.status(201).json({ success: true, updatedTask });
  } catch (err) {
    console.log(err);
  }
};

// * Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskServiceInstance.deleteTask(id);
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllTasks,
  updateTaskStatus,
  deleteTask,
  addTask,
};
