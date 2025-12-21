import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: Props) => {
  if (todos.length === 0) {
    return <p className="text-center text-gray-400">No tasks yet. Add one to get started!</p>;
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
