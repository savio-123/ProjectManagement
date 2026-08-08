import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";


function AddProject(){
    const [form, setForm] = useState({
        project_name: "",
        project_description: "",
        status: "NOT STARTED",
        start_date: "",
        end_date: ""
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addProject = async (e) => {
        e.preventDefault();
    
        try {
            await api.post("projects/", form, {
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
        <div className="container mt-4">
           <h2>Add Project</h2>

                <form onSubmit={addProject}>

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
    );
}

export default AddProject;