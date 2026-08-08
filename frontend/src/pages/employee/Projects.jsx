import { useEffect,useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import EmployeeSidebar from "../../components/EmployeeSidebar";

function Projects(){
    const [projects,setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try{
            const response = await api.get("my-projects/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });
            setProjects(response.data);
        }catch(error){
            console.log(error);
        }
    };

    return(
        <>
            <Navbar/>
            <div className="d-flex">
                <EmployeeSidebar/>
                <div className="container-fluid mt-4">
                    <h2 className="mb-4">My Projects</h2>
                    <div className="row">
                        {projects.map((project) => (
                            <div
                                className="col-12 col-md-6 col-lg-4 mb-4"
                                key={project.id}
                            >
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {project.project_name}
                                        </h5>
                                        <p>
                                            <strong>Description:</strong>{" "}
                                            {project.project_description}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {project.status}
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong>{" "}
                                            {project.start_date}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong>{" "}
                                            {project.end_date}
                                        </p>
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