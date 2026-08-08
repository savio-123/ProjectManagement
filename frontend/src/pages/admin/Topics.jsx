import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Topics(){
    const navigate = useNavigate();
    const [topics,setTopics] = useState([]);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try{
            const response = await api.get("topics/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });
            setTopics(response.data);
        }catch(error){
            console.log(error);
        }
    };

    const deleteTopic = async (id) => {
        try{
            await api.delete(`topics/${id}/`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });
            fetchTopics();
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
                    <h2>Topics</h2>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/admin/add-topic")}
                    >
                        Add Topic
                    </button>
                </div>
                <div className="row">
                    {topics.map((topic) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={topic.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {topic.topic_name}
                                    </h5>
                                    <p className="card-text">
                                        {topic.topic_description}
                                    </p>
                                    <p>
                                        <strong>Module:</strong> {topic.module_name}
                                    </p>
                                    <p>
                                        <strong>Priority:</strong> {topic.priority}
                                    </p>
                                    <p>
                                        <strong>Estimated Hours:</strong> {topic.estimated_hours}
                                    </p>
                                    <p>
                                        <strong>Due Date:</strong> {topic.due_date}
                                    </p>
                                    <p>
                                        <strong>Assigned Employee:</strong> {topic.employee_name}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {topic.status}
                                    </p>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => navigate(`/admin/edit-topic/${topic.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteTopic(topic.id)}
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

export default Topics;