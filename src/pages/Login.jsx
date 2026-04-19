import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Boş bırakma!");
      return;
    }

    if (username === "Nagihan Karakoç" && password === "123") {
      localStorage.setItem("user", username);
     
      navigate("/dashboard");
    } else {
      alert("Bilgiler yanlış!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Giriş Yap
        </h2>

        <input
          className="border p-3 w-full mb-4 rounded-lg"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-3 w-full mb-6 rounded-lg"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-3 rounded-lg"
        >
          Giriş Yap
        </button>

      </div>
    </div>
  );
}