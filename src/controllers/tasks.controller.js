const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// * Get all Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
};

// * Add a task
const addTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    console.log(title, description);
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//  * Update Task Status
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  try {
    // * Find the task by ID
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    // *Toggle the completion status
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        completed: !task.completed, // * Toggle the completion status
      },
    });

    res.status(201).json({ success: true, updatedTask });
  } catch (err) {
    console.log(err);
  }
};

// * Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.delete({
      where: { id: parseInt(id) },
    });
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
