import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            className="bg-light border-end"
            style={{
                width: "220px",
                minHeight: "100vh"
            }}
        >
            <div className="list-group list-group-flush">
                <Link
                    to="/admin/dashboard"
                    className="list-group-item"
                >
                    Dashboard
                </Link>
                <Link
                    to="/admin/employees"
                    className="list-group-item"
                >
                    Employees
                </Link>
                <Link
                    to="/admin/projects"
                    className="list-group-item"
                >
                    Projects
                </Link>
                <Link
                    to="/admin/modules"
                    className="list-group-item"
                >
                    Modules
                </Link>
                <Link
                    to="/admin/topics"
                    className="list-group-item"
                >
                    Topics
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;