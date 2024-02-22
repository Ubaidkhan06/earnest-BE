const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const tasksRouter = require("./routes/tasks.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(8000, () => {
  console.log("Server Listning on port 8000");
});
