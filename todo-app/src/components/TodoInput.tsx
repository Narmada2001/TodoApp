import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (title: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onAddTodo(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
        className="flex-1 px-3 sm:px-5 py-2.5 sm:py-3.5 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all backdrop-blur-sm"
      />
      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 active:scale-95"
      >
        <Plus size={18} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Add Task</span>
        <span className="sm:hidden">Add</span>
      </button>
    </div>
  );
};

export default TodoInput;
