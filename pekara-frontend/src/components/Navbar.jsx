import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <div style={styles.navbar}>

            <div>
                <strong>{username}</strong>
                <span> ({role})</span>
            </div>

            <button
                onClick={logout}
                style={styles.button}
            >
                Logout
            </button>

        </div>
    );
}

const styles = {

    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#222",
        color: "white"
    },

    button: {
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default Navbar;