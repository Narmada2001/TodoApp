import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

const TodoInput = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 border rounded"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 text-white bg-blue-600 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
