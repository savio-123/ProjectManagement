import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            className="bg-light border-end"
            style={{width: "220px",minHeight: "100vh"}}
        >
            <div className="list-group list-group-flush">
                <Link
                    to="/employee/dashboard"
                    className="list-group-item"
                >
                    Dashboard
                </Link>
                <Link
                    to="/employee/projects"
                    className="list-group-item"
                >
                    Projects
                </Link>
                <Link
                    to="/employee/modules"
                    className="list-group-item"
                >
                    Modules
                </Link>
                <Link
                    to="/employee/topics"
                    className="list-group-item"
                >
                    Topics
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;