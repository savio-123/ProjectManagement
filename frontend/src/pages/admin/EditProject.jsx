import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function EditProject(){
    const [form, setForm] = useState({
        project_name: "",
        project_description: "",
        status: "NOT STARTED",
        start_date: "",
        end_date: ""
    });
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetchProject();
    }, []);
    
    const fetchProject = async () => {
        try {
            const response = await api.get(`projects/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
    
            setForm(response.data);
    
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

    const updateProject = async (e) => {
        e.preventDefault();
    
        try {
            await api.put(`projects/${id}/`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
    
            navigate("/admin/projects");
    
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <>
    <Navbar />
    <div className="d-flex">
        <Sidebar/>
        <div className="container mt-4">
           <h2>Edit Project</h2>

              <form onSubmit={updateProject}>

                    <input
                        type="text"
                        name="project_name"
                        placeholder="Project Name"
                        className="form-control mb-3"
                        value={form.project_name}
                        onChange={handleChange}
                    />

                    <textarea
                        name="project_description"
                        placeholder="Project Description"
                        className="form-control mb-3"
                        value={form.project_description}
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        className="form-control mb-3"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="NOT STARTED">NOT STARTED</option>
                        <option value="IN PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="ON HOLD">ON HOLD</option>
                    </select>

                    <input
                        type="date"
                        name="start_date"
                        className="form-control mb-3"
                        value={form.start_date}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="end_date"
                        className="form-control mb-3"
                        value={form.end_date}
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

export default EditProject;