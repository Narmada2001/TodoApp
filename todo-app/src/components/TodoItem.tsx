import React from 'react';
import { Trash2, Check } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center gap-4 p-5 backdrop-blur-sm border rounded-xl transition-all duration-300 group hover:shadow-lg ${
      todo.completed
        ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-500/50'
        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
          todo.completed
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 scale-110'
            : 'border-white/30 hover:border-white/50 hover:scale-110 active:scale-95'
        }`}
      >
        {todo.completed && <Check size={16} className="text-white" />}
      </button>
      
      <span
        className={`flex-1 text-base transition-all duration-300 ${
          todo.completed
            ? 'line-through text-gray-400 opacity-60'
            : 'text-white font-medium'
        }`}
      >
        {todo.title}
      </span>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 p-1"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default TodoItem;
