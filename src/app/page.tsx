"use client";
import { useEffect, useState } from "react";
import EmojiComponent from "./emoji";
import "./globals.css";

interface Todo {
  _id: string;
  name: string;
  description: string;
  ddate: string;
  status: boolean;
}

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    ddate: "",
    status: false,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/todo")
      .then((response) => response.json())
      .then((data) => setTodos(data.data));
  }, []);

  const handleAddTodo = async () => {
    const response = await fetch("http://localhost:3000/api/v1/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    const data = await response.json();
    setTodos((prevTodos) => [...prevTodos, data.data as Todo]);
    setNewTodo({ name: "", description: "", ddate: "", status: false });
  };

  const handleUpdateTodo = async (id: string, status: boolean) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? { ...todo, status } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await fetch("http://localhost:3000/api/v1/todo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="todo-container">
      <h1>TODO List</h1>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <input
          type="date"
          value={newTodo.ddate}
          onChange={(e) => setNewTodo({ ...newTodo, ddate: e.target.value })}
        />
        <button className="add-btn" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className={`todo-item ${todo.status ? "completed" : ""}`}
          >
            <span>
              Name : {todo.name} <br/>
              Description : {todo.description} <br/> 
              Date : {todo.ddate}
            </span>
            <div className="todo-actions">
              <button
                className="status-btn"
                onClick={() => handleUpdateTodo(todo._id, !todo.status)}
              >
                {todo.status ? <EmojiComponent text="Undo" /> : <EmojiComponent text="Complete" />}
              </button>
              <button className="delete-btn" onClick={() => handleDeleteTodo(todo._id)}>
                <EmojiComponent text="Delete" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
