import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminRadniciPage() {

    const navigate = useNavigate();

    const [radnici, setRadnici] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [korisnickoIme, setKorisnickoIme] = useState("");
    const [uloga, setUloga] = useState("Radnik");
    const [lozinka, setLozinka] = useState("");
    const [ime, setIme] = useState("");
   
    const token = localStorage.getItem("token");
    const fetchRadnici = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/Korisnik`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRadnici(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        const loadData = async () => {
            await fetchRadnici();
        };

        loadData();

    }, []);

    const handleDelete = async (id) => {

        const potvrda = window.confirm(
            "Jeste li sigurni da želite izbrisati radnika?"
        );

        if (!potvrda) {
            return;
        }

        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/Korisnik/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchRadnici();

        } catch (error) {

            console.log(error);
        }
    };

    const handleCreate = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/Auth/register`,
                {
                    ime,
                    korisnickoIme,
                    uloga,
                    lozinka
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setKorisnickoIme("");
            setIme("");
            setUloga("Radnik");
            setLozinka("");

            setShowModal(false);

            fetchRadnici();

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <h1>Radnici</h1>

                <table style={styles.table}>

                    <thead>

                        <tr>
                            <th>Ime</th>
                            <th>Korisničko ime</th>
                            <th>Uloga</th>
                            <th>Akcije</th>
                        </tr>

                    </thead>

                    <tbody>

                        {radnici.map((r) => (

                            <tr key={r.idKorisnik}>
                                <td>{r.ime}</td>

                                <td>{r.korisnickoIme}</td>

                                <td>{r.uloga}</td>

                                <td>

                                    <button
                                        style={styles.deleteButton}
                                        onClick={() =>
                                            handleDelete(r.idKorisnik)
                                        }
                                    >
                                        Izbriši
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                {showModal && (

                    <div style={styles.modalOverlay}>

                        <div style={styles.modal}>

                            <h2>Dodaj novog radnika</h2>

                            <form
                                onSubmit={handleCreate}
                                style={styles.form}
                            >
                                <input
                                    type="text"
                                    placeholder="Ime"
                                    value={ime}
                                    onChange={(e) =>
                                        setIme(e.target.value)
                                    }
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Korisničko ime"
                                    value={korisnickoIme}
                                    onChange={(e) =>
                                        setKorisnickoIme(e.target.value)
                                    }
                                    style={styles.input}
                                />

                                <select
                                    value={uloga}
                                    onChange={(e) =>
                                        setUloga(e.target.value)
                                    }
                                    style={styles.input}
                                >
                                    <option value="admin">
                                        Admin
                                    </option>

                                    <option value="radnik">
                                        Radnik
                                    </option>

                                    <option value="prodavac">
                                        Prodavac
                                    </option>

                                </select>

                                <input
                                    type="password"
                                    placeholder="Lozinka"
                                    value={lozinka}
                                    onChange={(e) =>
                                        setLozinka(e.target.value)
                                    }
                                    style={styles.input}
                                />

                                <button
                                    type="submit"
                                    style={styles.addButton}
                                >
                                    Dodaj
                                </button>

                                <button
                                    type="button"
                                    style={styles.cancelButton}
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Odustani
                                </button>

                            </form>

                        </div>

                    </div>

                )}

                <div style={styles.bottomContainer}>

                    <button
                        style={styles.backButton}
                        onClick={() => navigate("/admin")}
                    >
                        Povratak na Dashboard
                    </button>
                                  
                    <button
                        style={styles.openModalButton}
                        onClick={() => setShowModal(true)}
                    >
                        Dodaj Radnika
                    </button>

               

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {
        padding: "40px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "30px"
    },

    addButtonContainer: {
        marginTop: "30px"
    },

    openModalButton: {
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    modal: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "400px"
    },

    formContainer: {
        marginTop: "50px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        marginTop: "20px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    },

    deleteButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    addButton: {
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    cancelButton: {
        backgroundColor: "#999",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    bottomContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "30px",
        
    },

    backButton: {
        backgroundColor: "#222",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default AdminRadniciPage;