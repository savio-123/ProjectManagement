import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import AddEmployee from "./pages/admin/AddEmployee";
import EditEmployee from "./pages/admin/EditEmployee";
import Projects from "./pages/admin/Projects";
import AddProject from "./pages/admin/AddProject";
import EditProject from "./pages/admin/EditProject";
import Modules from "./pages/admin/Modules";
import AddModule from "./pages/admin/AddModule";
import Topics from "./pages/admin/Topics";
import AddTopic from "./pages/admin/AddTopic";
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeProjects from "./pages/employee/Projects";
import EmployeeModules from "./pages/employee/Modules";
import EmployeeTopics from "./pages/employee/Topics";

import ProtectedRoute from "./components/ProtectedRoute";
import EditTopic from "./pages/admin/EditTopic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
            path="/admin/dashboard"
            element={
                <ProtectedRoute role="ADMIN">
                    <AdminDashboard />
                </ProtectedRoute>
            }
        />
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/add-employee" element={<AddEmployee />}/>
        <Route path="/admin/edit-employee/:id" element={<EditEmployee />}/>
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/add-project" element={<AddProject />}/>
        <Route path="/admin/edit-project/:id" element={<EditProject />}/>
        <Route path="/admin/modules" element={<Modules />} />
        <Route path="/admin/add-module" element={<AddModule />} />
        <Route path="/admin/topics" element={<Topics />} />
        <Route path="/admin/add-topic" element={<AddTopic />}/>
        <Route path="/admin/edit-topic/:id" element={<EditTopic />}/>

        <Route
            path="/employee/dashboard"
            element={
                <ProtectedRoute role="EMPLOYEE">
                    <EmployeeDashboard />
                </ProtectedRoute>
            }
        />
        <Route path="/employee/projects" element={<EmployeeProjects />} />
        <Route path="/employee/modules" element={<EmployeeModules />} />
        <Route path="/employee/topics" element={<EmployeeTopics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;