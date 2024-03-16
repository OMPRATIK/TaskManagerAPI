import express from "express";
import tasks from "./routes/tasks.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handlers.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("./public"));
// (we will send json from frontend -> so to parse it)
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
/*
  app.get("/api/v1/tasks")        - get all the tasks
  app.post("/api/v1/tasks")       - create a new task
  app.get("/api/v1/tasks/:id")    - get single task
  app.patch("/api/v1/tasks/:id")  - update task
  app.delete("/api/v1/tasks/:id") - delete task
 */
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("CONNECTED TO DB...");
    app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
