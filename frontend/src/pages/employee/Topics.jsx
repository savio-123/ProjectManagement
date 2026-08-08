import { useEffect,useState } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar";
import EmployeeSidebar from "../../components/EmployeeSidebar";

function Topics(){

const [topics,setTopics] = useState([]);

useEffect(() => {
    fetchTopics();
}, []);

const fetchTopics = async () => {
    try{
        const response = await api.get("my-topics/",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("access")}`
            }
        });

        setTopics(response.data);

    }catch(error){
        console.log(error);
    }
};

const handleChange = (id,field,value) => {
    setTopics(
        topics.map((topic) =>
            topic.id === id
                ? {...topic,[field]: value}
                : topic
        )
    );
};

const updateTopic = async (topic) => {
    try{
        await api.patch(`topics/${topic.id}/update/`,{
            status: topic.status,
            remarks: topic.remarks
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("access")}`
            }
        });

        toast.success("Updated")
        fetchTopics();

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
                <h2 className="mb-4">My Topics</h2>
                <div className="row">
                    {topics.map((topic) => (
                        <div
                            className="col-12 col-md-6 col-lg-4 mb-4"
                            key={topic.id}
                        >
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {topic.topic_name}
                                    </h5>
                                    <p>
                                        <strong>Module:</strong>{" "}
                                        {topic.module_name}
                                    </p>
                                    <p>
                                        <strong>Priority:</strong>{" "}
                                        {topic.priority}
                                    </p>
                                    <p>
                                        <strong>Estimated Hours:</strong>{" "}
                                        {topic.estimated_hours}
                                    </p>
                                    <p>
                                        <strong>Due Date:</strong>{" "}
                                        {topic.due_date}
                                    </p>
                                    <label className="form-label">
                                        <strong>Status</strong>
                                    </label>
                                    <select
                                        className="form-select mb-3"
                                        value={topic.status}
                                        onChange={(e) =>
                                            handleChange(
                                                topic.id,
                                                "status",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="TODO">Todo</option>
                                        <option value="IN PROGRESS">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                    </select>
                                    <label className="form-label">
                                        <strong>Remarks</strong>
                                    </label>
                                    <textarea
                                        className="form-control mb-3"
                                        value={topic.remarks || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                topic.id,
                                                "remarks",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => updateTopic(topic)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
);
}

export default Topics;