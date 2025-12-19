import { useState } from "react";
import type { Todo } from "./types/todo";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-2xl font-bold">To-Do App</h1>

        <TodoInput onAdd={addTodo} />

        <div className="mt-4">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
