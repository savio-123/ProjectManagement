import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function AddModule(){

const navigate = useNavigate();

const [projects,setProjects] = useState([]);

const [form,setForm] = useState({
    project: "",
    module_name: "",
    module_description: "",
    status: "NOT STARTED"
});

useEffect(() => {
    fetchProjects();
}, []);

const fetchProjects = async () => {
    try{
        const response = await api.get("projects/",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("access")}`
            }
        });

        setProjects(response.data);

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

const addModule = async(e) => {
    e.preventDefault();
    try{
        await api.post("modules/",form,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("access")}`
            }
        });
        navigate("/admin/modules");
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
        <h2>Add Module</h2>

        <form onSubmit={addModule}>
            <select
                name="project"
                className="form-control mb-3"
                value={form.project}
                onChange={handleChange}
            >
                <option value="">Select Project</option>

                {projects.map((project)=>(
                    <option
                        key={project.id}
                        value={project.id}
                    >
                        {project.project_name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="module_name"
                placeholder="Module Name"
                className="form-control mb-3"
                value={form.module_name}
                onChange={handleChange}
            />
            <textarea
                name="module_description"
                placeholder="Module Description"
                className="form-control mb-3"
                value={form.module_description}
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

export default AddModule;