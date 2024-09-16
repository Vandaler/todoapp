"use client"
import React from "react";

export default function Home() {
  React.useEffect(() => {
    fetch("http://localhost:3000/api/v1/todo",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res=> res.json()).catch(err=>{console.error(err)});
  },[]);

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" name="todo" id="todo" />
      <button type="submit">Add</button>

      <ul>
        
      </ul>
    </div>
  );
}
