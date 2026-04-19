import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt, FaStickyNote } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
 // const user = localStorage.getItem("user");

  const menu = [
    { name: "Ajanda", path: "/dashboard", icon: <FaCalendarAlt /> },
    { name: "Notlar", path: "/notes", icon: <FaStickyNote /> },
  ];

  return ( 
    <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white p-4 flex flex-col justify-between">

      <div>
        <h2 className="text-xl font-bold mb-6">Ajanda App</h2>

        <ul className="space-y-2">
          {menu.map((item, i) => (
            <li
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
              ${location.pathname === item.path
                  ? "bg-white text-blue-700"
                  : "hover:bg-blue-600"
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
        className="bg-blue-800 p-2 rounded-lg hover:bg-blue-900 transition"
      >
        Çıkış Yap
      </button>

    </div>
  );
}