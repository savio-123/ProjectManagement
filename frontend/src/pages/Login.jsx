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
        <div
            className="d-flex align-items-center justify-content-center min-vh-100"
            style={{ backgroundColor: "#4f90ff" }}
        >
            <div className="card shadow border-0 p-4" style={{ width: "400px" }}>

                <div className="text-center mb-4">
                    <h2 className="fw-bold">Project Management</h2>
                    <p className="text-muted mb-0">
                        Login to your account
                    </p>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-semibold">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary btn-lg w-100"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className="text-center text-muted mt-4 mb-0">
                    Project Management System
                </p>

            </div>

            <ToastContainer />
        </div>
    );
}

export default Login;