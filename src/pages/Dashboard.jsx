import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import CalendarView from "../components/CalendarView";
import { createTask } from "../interfaces/Task";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

  const user = localStorage.getItem("user");

  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem(user ? `tasks_${user}` : "tasks");
    return data ? JSON.parse(data) : [];
  });
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Orta");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  //  tarih formatı
  const formatDate = (d) => {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  const selectedDate = formatDate(date);

  //  kullanıcıya özel storage
  const storageKey = user ? `tasks_${user}` : "tasks";

  // save
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  //  ekle
  const addTask = () => {
    if (!input.trim()) return;

    const newTask = createTask(input, selectedDate, priority);

    setTasks([...tasks, newTask]);
    setInput("");
  };

  //  toggle
  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  //  sil
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  //  edit
  const saveEdit = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, text: editText } : t
    ));
    setEditId(null);
  };

  //  bugünün görevleri
  const todayTasks = tasks.filter(t => t.date === selectedDate);

  //  yaklaşan görevler 
  const upcomingTasks = tasks
    .filter(t => t.date > selectedDate)
    .sort((a, b) => {
      const order = { "Yüksek": 1, "Orta": 2, "Düşük": 3 };
      return order[a.priority] - order[b.priority];
    });

  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6">

        <h1 className="text-2xl font-bold mb-4">
          Hoş Geldin, {user}
        </h1>

        {/* TAKVİM */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <CalendarView
            date={date}
            setDate={setDate}
            tasks={tasks}
            formatDate={formatDate}
          />
        </div>

        {/* INPUT */}
        <input
          className="border p-2 w-full rounded"
          placeholder="Görev..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 w-full mt-2 rounded"
        >
          <option>Yüksek</option>
          <option>Orta</option>
          <option>Düşük</option>
        </select>

        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 mt-2 w-full rounded"
        >
          Ekle
        </button>

        {/* BUGÜN */}
        <h3 className="mt-4 font-bold">Bugün</h3>

        {todayTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editId={editId}
            setEditId={setEditId}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
          />
        ))}

        {/* GELECEK */}
        <h3 className="mt-4 font-bold">Yaklaşan</h3>

        {upcomingTasks.map(task => (
          <div
            key={task.id}
            className={`p-2 mt-2 rounded ${
              task.priority === "Yüksek"
                ? "bg-red-100"
                : task.priority === "Orta"
                ? "bg-yellow-100"
                : "bg-green-100"
            }`}
          >
            {task.text} - {task.priority} ({task.date})
          </div>
        ))}

      </div>
    </div>
  );
}