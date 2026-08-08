import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function EditEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: ""
    });

    useEffect(() => {
        fetchEmployee();
    }, []);
    
    const fetchEmployee = async () => {
        try {
            const response = await api.get(`users/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
    
            setForm({
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                password: "",
                role: response.data.role
            });
    
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const updateEmployee = async (e) => {
        e.preventDefault();
    
        try {
            await api.put(`users/${id}/`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
    
            navigate("/admin/employees");
    
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
    <Navbar />
    <div className="d-flex">
        <Sidebar/>
        <div className="container mt-4">
            <h2>Edit Employee</h2>
            <form onSubmit={updateEmployee}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-control mb-3"
                    value={form.username}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="form-control mb-3"
                    value={form.first_name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="form-control mb-3"
                    value={form.last_name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    value={form.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Save
                </button>
            </form>
        </div>
        </div>
           </> 
    );
}

export default EditEmployee;