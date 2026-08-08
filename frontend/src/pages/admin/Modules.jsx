import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { toast,ToastContainer } from "react-toastify";

function Modules(){
    const [modules,setModules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchModules();
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

    const handleChange = (id,value) => {
        setModules(
            modules.map((module) =>
                module.id === id
                    ? {...module,status:value}
                    : module
            )
        );
    };

    const updateStatus = async (module) => {
        try{
            await api.patch(`modules/${module.id}/`,{
                status: module.status
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });
            toast.success("Updated")

            fetchModules();

        }catch(error){
            console.log(error);
        }
    };

    const deleteModule = async (id) => {
        try{
            await api.delete(`modules/${id}/`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });

            fetchModules();

        }catch(error){
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
                    <h2>Modules</h2>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/admin/add-module")}
                    >
                        Add Module
                    </button>
                </div>
                <div className="row">
                    {modules.map((module) => (
                        <div
                            className="col-md-6 col-lg-4 mb-4"
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

                                    <label className="form-label">
                                        <strong>Status</strong>
                                    </label>

                                    <select
                                        className="form-select mb-3"
                                        value={module.status}
                                        onChange={(e) =>
                                            handleChange(
                                                module.id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="NOT STARTED">
                                            Not Started
                                        </option>
                                        <option value="IN PROGRESS">
                                            In Progress
                                        </option>
                                        <option value="COMPLETED">
                                            Completed
                                        </option>
                                        <option value="ON HOLD">
                                            On Hold
                                        </option>
                                    </select>

                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => updateStatus(module)}
                                        >
                                            Update
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteModule(module.id)}
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
        <ToastContainer />
    </>
);
}

export default Modules;