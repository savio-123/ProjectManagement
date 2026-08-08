import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Cell,
    ResponsiveContainer
} from "recharts";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import EmployeeSidebar from "../../components/EmployeeSidebar";


function Dashboard(){
    const [dashboard,setDashboard] = useState({});
    const [graphData,setGraphData] = useState({});
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042"
    ];

    useEffect(() => {
        fetchDashboard();
        fetchGraphs();
    }, []);

    const fetchDashboard = async () => {
        try{
            const response = await api.get("dashboard/employee/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });

            setDashboard(response.data);

        }catch(error){
            console.log(error);
        }
    };

    const fetchGraphs = async () => {
        try{
            const response = await api.get("dashboard/employee-graphs/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access")}`
                }
            });
            setGraphData(response.data);
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
                    <h2 className="mb-4">Employee Dashboard</h2>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Assigned Projects</h5>
                                <h3>{dashboard.assigned_projects}</h3>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Assigned Modules</h5>
                                <h3>{dashboard.assigned_modules}</h3>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Assigned Topics</h5>
                                <h3>{dashboard.assigned_topics}</h3>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Completed Topics</h5>
                                <h3>{dashboard.completed_topics}</h3>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Pending Topics</h5>
                                <h3>{dashboard.pending_topics}</h3>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Overdue Topics</h5>
                                <h3>{dashboard.overdue_topics}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card p-3">
                                <h5>Personal Task Status</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={graphData.task_status}
                                            dataKey="count"
                                            nameKey="status"
                                            outerRadius={100}
                                            label
                                        >
                                            {graphData.task_status?.map((entry,index)=>(
                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip/>
                                        <Legend/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card p-3">
                                <h5>Priority-wise Topics</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={graphData.priority_wise_topics}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="priority"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar
                                            dataKey="count"
                                            fill="#0088FE"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card p-3">
                                <h5>Weekly Progress</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={graphData.weekly_progress}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="day"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar
                                            dataKey="completed"
                                            fill="#00C49F"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card p-3">
                                <h5>Monthly Progress</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={graphData.monthly_completed_topics}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="month"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar
                                            dataKey="completed"
                                            fill="#0088FE"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;