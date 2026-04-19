import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ date, setDate, tasks, formatDate }) {
  return (
    <Calendar
      onChange={setDate}
      value={date}
      className="w-full"
      tileContent={({ date }) => {

        const day = formatDate(date);
        const dayTasks = tasks.filter(t => t.date === day);

        if (dayTasks.length === 0) return null;

        const priorityOrder = ["Yüksek", "Orta", "Düşük"];

        const highestPriority = priorityOrder.find(p =>
          dayTasks.some(t => t.priority === p)
        );

        let color = "bg-green-500";

        if (highestPriority === "Yüksek") color = "bg-red-500";
        else if (highestPriority === "Orta") color = "bg-yellow-400";

        return (
          <div className="flex justify-center mt-1">
            <div className={`w-2 h-2 ${color} rounded-full animate-pulse`}></div>
          </div>
        );
      }}
    />
  );
}