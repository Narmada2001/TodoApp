import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'all' | 'completed' | 'pending';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = (): Todo[] => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen px-3 py-4 sm:px-4 sm:py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-purple-500 rounded-full top-20 left-10 w-60 h-60 sm:w-80 sm:h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bg-blue-500 rounded-full top-40 right-10 w-60 h-60 sm:w-80 sm:h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-500 rounded-full -bottom-8 left-20 w-60 h-60 sm:w-80 sm:h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 text-center sm:mb-12">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-purple-400 bg-purple-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-500/20">✨ Task Management</span>
          </div>
          <h1 className="px-4 mb-2 text-3xl font-bold text-transparent text-white sm:text-5xl lg:text-6xl sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text">
            Productive Today
          </h1>
          <p className="max-w-2xl px-4 mx-auto text-sm text-gray-300 sm:text-lg">
            Organize, prioritize, and accomplish your goals with our beautiful task management system.
          </p>
        </div>

        {/* Main Card */}
        <div className="p-4 border shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 rounded-2xl sm:rounded-3xl sm:p-8 lg:p-10">
          <TodoInput onAddTodo={addTodo} />

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6 sm:gap-3 sm:mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                filter === 'pending'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mb-6 sm:gap-4 sm:mb-8">
            <div className="p-2 text-center border rounded-lg bg-white/5 border-white/10 sm:rounded-xl sm:p-4">
              <p className="mb-1 text-xs text-gray-400 sm:text-sm">Total Tasks</p>
              <p className="text-xl font-bold text-white sm:text-3xl">{todos.length}</p>
            </div>
            <div className="p-2 text-center border rounded-lg bg-white/5 border-white/10 sm:rounded-xl sm:p-4">
              <p className="mb-1 text-xs text-gray-400 sm:text-sm">Pending</p>
              <p className="text-xl font-bold text-blue-400 sm:text-3xl">{pendingCount}</p>
            </div>
            <div className="p-2 text-center border rounded-lg bg-white/5 border-white/10 sm:rounded-xl sm:p-4">
              <p className="mb-1 text-xs text-gray-400 sm:text-sm">Completed</p>
              <p className="text-xl font-bold text-green-400 sm:text-3xl">{completedCount}</p>
            </div>
          </div>

          {/* Progress Bar */}
          {todos.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between mb-2">
                <p className="text-xs text-gray-400 sm:text-sm">Progress</p>
                <p className="text-xs font-semibold text-gray-300 sm:text-sm">{Math.round((completedCount / todos.length) * 100)}%</p>
              </div>
              <div className="w-full h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${(completedCount / todos.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
