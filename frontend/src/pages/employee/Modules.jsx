import { useEffect,useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import EmployeeSidebar from "../../components/EmployeeSidebar";

function Modules(){

const [modules,setModules] = useState([]);

useEffect(() => {
    fetchModules();
}, []);

const fetchModules = async () => {
    try{
        const response = await api.get("my-modules/",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("access")}`
            }
        });

        setModules(response.data);

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
                <h2 className="mb-4">My Modules</h2>
                <div className="row">
                    {modules.map((module) => (
                        <div
                            className="col-12 col-sm-6 col-lg-4 mb-4"
                            key={module.id}
                        >
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {module.module_name}
                                    </h5>
                                    <p>
                                        <strong>Project:</strong>{" "}
                                        {module.project_name}
                                    </p>
                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {module.module_description}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {module.status}
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

export default Modules;