import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="text-4xl">📝</span>
        </div>
        <p className="text-xl text-gray-300 font-semibold mb-2">No tasks yet</p>
        <p className="text-gray-400">Create your first task to get started on your journey to productivity!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      {todos.map((todo, index) => (
        <div key={todo.id} style={{ animationDelay: `${index * 50}ms` }}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
