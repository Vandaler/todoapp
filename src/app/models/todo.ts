import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    ddate: {
      type: String,
    },
    status: {
      type: Boolean,
    },
  });
//connent to "todos" collection
const Todo = mongoose.models.todos || mongoose.model("todos", TodoSchema);
export default Todo;  