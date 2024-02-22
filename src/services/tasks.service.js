const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class TaskService {
  //  * Get All Tasks
  async getAllTasks() {
    try {
      const tasks = await prisma.task.findMany();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  //   * Add task
  async addTask(title, description) {
    try {
      const result = await prisma.task.create({
        data: {
          title,
          description,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  //   * Update task based on id
  async updateTask(id) {
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

      return updatedTask;
    } catch (err) {
      throw err;
    }
  }

  //   * Delete task based on id
  async deleteTask(id) {
    try {
      const task = await prisma.task.delete({
        where: { id: parseInt(id) },
      });
      return task;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TaskService;
