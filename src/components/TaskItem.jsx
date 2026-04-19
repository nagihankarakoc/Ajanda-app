import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
  editId,
  setEditId,
  editText,
  setEditText,
  saveEdit
}) {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded mt-2 transition duration-300 hover:scale-[1.02] hover:shadow-md ${
        task.priority === "Yüksek"
          ? "bg-red-100"
          : task.priority === "Orta"
          ? "bg-yellow-100"
          : "bg-green-100"
      }`}
    >
      {/* LEFT */}
      <div className="flex gap-2 items-center w-full">

        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTask(task.id)}
        />

        {editId === task.id ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border px-2 w-full rounded"
          />
        ) : (
          <span className={`w-full ${task.done ? "line-through text-gray-500" : ""}`}>
            {task.text}
          </span>
        )}

      </div>

      {/* RIGHT */}
      <div className="flex gap-3 ml-2">

        {editId === task.id ? (
          <button onClick={() => saveEdit(task.id)}>
            <FaSave className="hover:text-green-600 transition cursor-pointer" />
          </button>
        ) : (
          <button
            onClick={() => {
              setEditId(task.id);
              setEditText(task.text);
            }}
          >
            <FaEdit className="hover:text-blue-600 transition cursor-pointer" />
          </button>
        )}

        <button onClick={() => deleteTask(task.id)}>
          <FaTrash className="hover:text-red-500 transition cursor-pointer" />
        </button>

      </div>
    </div>
  );
}