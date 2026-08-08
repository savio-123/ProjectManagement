import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!username || !password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const response = await api.post("login/", {
                username,
                password,
            });
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("role", response.data.role);

            toast.success("Login Successful");

            if (response.data.role === "ADMIN") {
                navigate("/admin/dashboard");
            }
            else {
                navigate("/employee/dashboard");
            }
    
        } catch (error) {
            toast.error("Invalid Username or Password");
        }
    };
    return (
          <div className="container mt-5">  
             <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4">
                        <h3 className="text-center mb-4">
                            Login
                        </h3>
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-control mb-3"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
              </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;