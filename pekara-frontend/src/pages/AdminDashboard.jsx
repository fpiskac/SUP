import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    const navigate = useNavigate();

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <h1>Admin Dashboard</h1>

                <div style={styles.cards}>

                    <div
                        style={styles.card}
                        onClick={() => navigate("/admin/radnici")}
                    >
                        Radnici
                    </div>

                    <div
                        style={styles.card}
                        onClick={() =>
                            navigate("/admin/proizvodi")
                        }
                    >
                        Proizvodi
                    </div>

                    <div
                        style={styles.card}
                        onClick={() => navigate("/admin/sastojci")}
                    >
                        Sastojci
                    </div>

                    <div
                        style={styles.card}
                        onClick={() => navigate("/admin/recepti")}
                    >
                        Recepti
                    </div>

                    <div
                        style={styles.card}
                        onClick={() =>
                            navigate("/admin/evidencija")
                        }
                    >
                        Evidencija
                    </div>

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {
        padding: "40px"
    },

    cards: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        marginTop: "30px"
    },

    card: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontSize: "20px",
        cursor: "pointer"
    }
};

export default AdminDashboard;