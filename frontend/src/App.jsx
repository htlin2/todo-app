import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBar from "./TodoBar";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoDesc, setTodoDesc] = useState("");
  const getTodoList = async () => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      if (!res.ok) throw new Error("Network response was not ok");
      const todoList = await res.json();
      setTodoList(todoList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getTodoList();
  }, []);
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" });
    await getTodoList();
  };
  const addTodo = async () => {
    const bodyMessage = { description: todoDesc };
    await fetch(`http://localhost:3000/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyMessage),
    });
    await getTodoList();
    setTodoDesc("");
  };
  const editTodo = async ({ id, description }) => {
    const bodyMessage = { description };
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyMessage),
    });
    await getTodoList();
  };
  return (
    <Container fluid="md">
      <TodoBar
        addTodo={addTodo}
        todoDesc={todoDesc}
        setTodoDesc={setTodoDesc}
      />
      <TodoList
        todoList={todoList}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </Container>
  );
}

export default App;
