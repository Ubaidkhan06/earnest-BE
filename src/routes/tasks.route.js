const {
  getAllTasks,
  updateTaskStatus,
  addTask,
  deleteTask,
} = require("../controllers/tasks.controller");

const tasksRouter = require("express").Router();

tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", addTask);
tasksRouter.put("/:id", updateTaskStatus);
tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
