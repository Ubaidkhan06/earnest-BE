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
  async addTask({ title, description }) {
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
  async updateTask(id) {}

  //   * Delete task based on id
  async deleteTask(id) {}
}
