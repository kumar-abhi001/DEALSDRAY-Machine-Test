import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../constants";

export const Home = () => {
  console.log(serverUrl);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetch(`${serverUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.token);
          navigate("/admin/dashboard");
        })
        .catch((error) => {
          console.log("Error in login: ", error);
        });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-10 p-10 bg-slate-50">
      <div className="border-2 p-10 bg-[#ffffff]">
        <h1 className="text-3xl font-bold text-center mb-5">
          Welcome to the Login Page
        </h1>
        <Input
          type="text"
          placeholder="Enter you username"
          value={username}
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter you password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="border-2 px-4 py-2 rounded-3xl bg-blue-500 text-white"
          onClick={() => {
            fetch(`${serverUrl}/admin/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data.token);
                window.localStorage.setItem("token", data.token);
                navigate("/admin/dashboard", { state: { name:username }});
              })
              .catch((error) => {
                console.log("Error in login: ", error);
              });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
