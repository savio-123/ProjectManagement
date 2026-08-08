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
    ResponsiveContainer,
    Cell
} from "recharts";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Dashboard() {

    const [dashboard, setDashboard] = useState({});
    const [graphData, setGraphData] = useState({});
    const COLORS = [
        "#F7B7A3",
        "#9B3192",
        "#2B0B3F",
        "#FF8042"
    ];

    useEffect(() => {
        fetchDashboard();
        fetchGraphs();
    }, []);
    
    const fetchDashboard = async () => {
    
        try {
    
            const response = await api.get("dashboard/admin/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
    
            setDashboard(response.data);
    
        } catch (error) {
            console.log(error);
        }
    
    };

    const fetchGraphs = async () => {

        try {
    
            const response = await api.get("dashboard/admin-graphs/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });
    
            setGraphData(response.data);
    
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
                    <h2 className="mb-4">Admin Dashboard</h2>
    
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Total Employees</h5>
                                <h3>{dashboard.total_employees}</h3>
                            </div>
                        </div>
    
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Total Projects</h5>
                                <h3>{dashboard.total_projects}</h3>
                            </div>
                        </div>
    
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Total Modules</h5>
                                <h3>{dashboard.total_modules}</h3>
                            </div>
                        </div>
    
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card p-3 h-100">
                                <h5>Total Topics</h5>
                                <h3>{dashboard.total_topics}</h3>
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
                                <h5>Employee-wise Completed Topics</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={graphData.employee_completed_topics}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="username"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="completed"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
    
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card p-3">
                                <h5>Employee-wise Pending Topics</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={graphData.employee_pending_topics}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="username"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="pending"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
    
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="card p-3">
                                <h5>Project Status Distribution</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={graphData.project_status_distribution}
                                            dataKey="count"
                                            nameKey="status"
                                            outerRadius={100}
                                            label
                                        >
                                            {graphData.project_status_distribution?.map((entry,index) => (
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
                                <h5>Topic Status Distribution</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={graphData.topic_status_distribution}
                                            dataKey="count"
                                            nameKey="status"
                                            outerRadius={100}
                                            label
                                        >
                                            {graphData.topic_status_distribution?.map((entry,index) => (
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
    
                        <div className="col-12 mb-4">
                            <div className="card p-3">
                                <h5>Priority-wise Topics</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={graphData.priority_wise_topics}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="priority"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="count"/>
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