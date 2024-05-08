import { Input } from "../components/Input";
import { useState } from "react";

export const Home = () => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
                <button className="border-2 px-4 py-2 rounded-3xl bg-blue-500 text-white"
                    onClick={() => {
                      // Add your login logic here
                      console.log("Username: ", username, password);
                    }}
                >
            Login
          </button>
        </div>
      </div>
    );
}