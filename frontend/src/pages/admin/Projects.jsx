import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Projects() {   
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get("projects/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });

            setProjects(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteProject = async (id) => {
        try {
            await api.delete(`projects/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
    
            fetchProjects();
    
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <>
            <Navbar/>
            <div className="d-flex">
                <Sidebar/>
                <div className="container-fluid mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Projects</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/admin/add-project")}
                        >
                            Add Project
                        </button>
                    </div>
                    <div className="row">
                        {projects.map((project) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {project.project_name}
                                        </h5>
                                        <p className="card-text">
                                            {project.project_description}
                                        </p>
                                        <p>
                                            <strong>Status:</strong> {project.status}
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong> {project.start_date}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong> {project.end_date}
                                        </p>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => navigate(`/admin/edit-project/${project.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteProject(project.id)}
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

export default Projects;