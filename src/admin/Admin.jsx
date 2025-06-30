// src/admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ prevent double login
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loading) return; // ✅ avoid double-clicks
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token); // ✅ Save token
        setTimeout(() => {
          navigate("/admin/dashboard"); // ✅ safe redirect
        }, 200); // slight delay for smoother transition
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    } finally {
      setLoading(false); // ✅ allow retry
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl mb-4 font-semibold text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 bg-gray-700 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 bg-gray-700 rounded"
          required
        />
        <button
          type="button" // ✅ changed from "submit"
          onClick={handleLogin} // ✅ manually handle login
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded cursor-pointer"
          disabled={loading} // ✅ disable during request
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

// src/admin/AdminLogin.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE}/api/admin/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, password }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("adminToken", data.token); // ✅ Save token
//         navigate("/admin/dashboard");
//       } else {
//         alert(data.message || "Invalid credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
//       <form
//         onSubmit={handleLogin}
//         className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm"
//       >
//         <h2 className="text-xl mb-4 font-semibold text-center">Admin Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full mb-3 p-2 bg-gray-700 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-2 bg-gray-700 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded cursor-pointer"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
