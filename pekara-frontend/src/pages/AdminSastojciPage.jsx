import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminSastojciPage() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [sastojci, setSastojci] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [naziv, setNaziv] = useState("");
    const [kg, setKg] = useState("");
    const [g, setG] = useState("");
    const [eur, setEur] = useState("");
    const [cent, setCent] = useState("");
    
    const fetchSastojci = async () => {

        try {

            const response = await axios.get(
                "https://localhost:7009/api/Sastojak",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSastojci(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchSastojci();

    }, []);

    const resetForm = () => {

        setNaziv("");
        setKg("");
        setG("");

        setEur("");
        setCent("");

        setEditingId(null);
    };

    const handleCreateOrUpdate = async (e) => {

        e.preventDefault();

        const ukupnoGrama =
            (Number(kg) * 1000) + Number(g);

        const ukupnoCenti =
            (Number(eur) * 100) + Number(cent);

        const data = {
            naziv,
            kolicinaNabave: ukupnoGrama,
            cijenaNabave: ukupnoCenti
        };

        try {

            if (editingId === null) {

                await axios.post(
                    "https://localhost:7009/api/Sastojak",
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            } else {

                await axios.put(
                    `https://localhost:7009/api/Sastojak/${editingId}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            fetchSastojci();

            resetForm();

            setShowModal(false);

        } catch (error) {

            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        const potvrda = window.confirm(
            "Jeste li sigurni da želite izbrisati sastojak?"
        );

        if (!potvrda) {
            return;
        }

        try {

            await axios.delete(
                `https://localhost:7009/api/Sastojak/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchSastojci();

        } catch (error) {

            console.log(error);
        }
    };

    const handleEdit = (sastojak) => {

        setEditingId(sastojak.idSastojak);

        setNaziv(sastojak.naziv);
        setKg(
            Math.floor(
                sastojak.kolicinaNabave / 1000
            )
        );

        setG(
            sastojak.kolicinaNabave % 1000
        );
        
        setEur(
            Math.floor(
                sastojak.cijenaNabave / 100
            )
        );

        setCent(
            sastojak.cijenaNabave % 100
        );

        setShowModal(true);
    };

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <h1>Sastojci</h1>

                <table style={styles.table}>

                    <thead>

                        <tr>
                            <th>Naziv</th>
                            <th>Količina Nabave(gram)</th>
                            <th>Cijena Nabave(centi)</th>
                            <th>Cijena po Jedinici(centi/g)</th>
                            <th>Akcije</th>
                        </tr>

                    </thead>

                    <tbody>

                        {sastojci.map((s) => (

                            <tr key={s.idSastojak}>

                                <td>{s.naziv}</td>

                                <td>{s.kolicinaNabave}</td>

                                <td>{s.cijenaNabave}</td>

                                <td>{s.cijenaPoJedinici}</td>

                                <td>

                                    <div style={styles.actionButtons}>

                                        <button
                                            style={styles.editButton}
                                            onClick={() =>
                                                handleEdit(s)
                                            }
                                        >
                                            Uredi
                                        </button>

                                        <button
                                            style={styles.deleteButton}
                                            onClick={() =>
                                                handleDelete(s.idSastojak)
                                            }
                                        >
                                            Izbriši
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                {showModal && (

                    <div style={styles.modalOverlay}>

                        <div style={styles.modal}>

                            <h2>
                                {editingId === null
                                    ? "Dodaj sastojak"
                                    : "Uredi sastojak"}
                            </h2>

                            <form
                                onSubmit={handleCreateOrUpdate}
                                style={styles.form}
                            >

                                <input
                                    type="text"
                                    placeholder="Naziv"
                                    value={naziv}
                                    onChange={(e) =>
                                        setNaziv(e.target.value)
                                    }
                                    style={styles.input}
                                />

                                <div style={styles.row}>

                                    <input
                                        type="number"
                                        placeholder="KG"
                                        value={kg}
                                        onChange={(e) => setKg(e.target.value)}
                                        style={styles.input}
                                    />

                                    <input
                                        type="number"
                                        placeholder="G"
                                        value={g}
                                        onChange={(e) => setG(e.target.value)}
                                        style={styles.input}
                                    />

                                </div>

                                <div style={styles.row}>
                                    <input
                                        type="number"
                                        placeholder="EUR"
                                        value={eur}
                                        onChange={(e) => setEur(e.target.value)}
                                        style={styles.input}
                                    />

                                    <input
                                        type="number"
                                        placeholder="CENT"
                                        value={cent}
                                        onChange={(e) => setCent(e.target.value)}
                                        style={styles.input}
                                    />

                                </div>

                                <button
                                    type="submit"
                                    style={styles.addButton}
                                >
                                    Spremi
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
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                    >
                        Dodaj Sastojak
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

    actionButtons: {
        display: "flex",
        gap: "10px"
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

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "20px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc"
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

    editButton: {
        backgroundColor: "#1e90ff",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    deleteButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    bottomContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "50px"
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

export default AdminSastojciPage;