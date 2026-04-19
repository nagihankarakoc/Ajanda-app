import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaStickyNote } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Ajanda", path: "/dashboard", icon: <FaCalendarAlt /> },
    { name: "Notlar", path: "/notes", icon: <FaStickyNote /> },
  ];

  return (
    <div className="w-64 bg-blue-600 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Ajanda App</h2>

        <ul className="space-y-2">
          {menu.map((item, i) => (
            <li
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                location.pathname === item.path
                  ? "bg-white text-blue-600"
                  : "hover:bg-blue-500"
              }`}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
        className="bg-blue-800 p-2 rounded hover:bg-blue-900"
      >
        Çıkış Yap
      </button>
    </div>
  );
}