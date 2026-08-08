import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await api.get("users/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
            setEmployees(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteEmployee = async (id) => {

        if (window.confirm("Are you sure you want to delete this employee?")){
            try {
                await api.delete(`users/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`
                    }
                });
                fetchEmployees();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return(
        <>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div className="container-fluid mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Employees</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/admin/add-employee")}
                        >
                            Add Employee
                        </button>
                    </div>
                    <div className="row">
                        {employees.map((employee) => (
                            <div
                                className="col-md-6 col-lg-4 mb-4"
                                key={employee.id}
                            >
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {employee.username}
                                        </h5>
                                        <p>
                                            <strong>First Name:</strong>{" "}
                                            {employee.first_name}
                                        </p>
                                        <p>
                                            <strong>Last Name:</strong>{" "}
                                            {employee.last_name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {employee.email}
                                        </p>
                                        <p>
                                            <strong>Role:</strong>{" "}
                                            {employee.role}
                                        </p>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => navigate(`/admin/edit-employee/${employee.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteEmployee(employee.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Employees;