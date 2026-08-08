import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                
                   <div className="navbar-brand">
                    Project Management
                    </div>
                    
                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
        </div>
    </nav>
    );
}

export default Navbar;