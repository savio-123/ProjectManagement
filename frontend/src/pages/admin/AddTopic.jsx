import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function AddTopic(){

    const navigate = useNavigate();

    const [modules,setModules] = useState([]);
    const [employees,setEmployees] = useState([]);

    const [form,setForm] = useState({
        module: "",
        topic_name: "",
        topic_description: "",
        priority: "LOW",
        estimated_hours: "",
        due_date: "",
        assigned_employee: "",
        status: "TODO",
        remarks: ""
    });

    useEffect(() => {
        fetchModules();
        fetchEmployees();
    }, []);

    const fetchModules = async () => {
        try{
            const response = await api.get("modules/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });

            setModules(response.data);

        }catch(error){
            console.log(error);
        }
    };

    const fetchEmployees = async () => {
        try{
            const response = await api.get("users/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });

            setEmployees(response.data);

        }catch(error){
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addTopic = async (e) => {
        e.preventDefault();

        try{
            await api.post("topics/",form,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });

            navigate("/admin/topics");

        }catch(error){
            console.log(error);
        }
    };

    return(
        <>
    <Navbar />
    <div className="d-flex">
        <Sidebar/>
        <div className="container mt-4">

            <h2>Add Topic</h2>
            <form onSubmit={addTopic}>
                <select
                    name="module"
                    className="form-control mb-3"
                    value={form.module}
                    onChange={handleChange}
                >
                    <option value="">Select Module</option>

                    {modules.map((module)=>(
                        <option
                            key={module.id}
                            value={module.id}
                        >
                            {module.module_name}
                        </option>
                    ))}

                </select>

                <input
                    type="text"
                    name="topic_name"
                    placeholder="Topic Name"
                    className="form-control mb-3"
                    value={form.topic_name}
                    onChange={handleChange}
                />
                <textarea
                    name="topic_description"
                    placeholder="Topic Description"
                    className="form-control mb-3"
                    value={form.topic_description}
                    onChange={handleChange}
                />

                <select
                    name="priority"
                    className="form-control mb-3"
                    value={form.priority}
                    onChange={handleChange}
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                <input
                    type="number"
                    name="estimated_hours"
                    placeholder="Estimated Hours"
                    className="form-control mb-3"
                    value={form.estimated_hours}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="due_date"
                    className="form-control mb-3"
                    value={form.due_date}
                    onChange={handleChange}
                />
                <select
                    name="assigned_employee"
                    className="form-control mb-3"
                    value={form.assigned_employee}
                    onChange={handleChange}
                >
                    <option value="">Select Employee</option>

                    {employees.map((employee)=>(
                        <option
                            key={employee.id}
                            value={employee.id}
                        >
                            {employee.username}
                        </option>
                    ))}

                </select>
                <select
                    name="status"
                    className="form-control mb-3"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="TODO">Todo</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <textarea
                    name="remarks"
                    placeholder="Remarks"
                    className="form-control mb-3"
                    value={form.remarks}
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

export default AddTopic;