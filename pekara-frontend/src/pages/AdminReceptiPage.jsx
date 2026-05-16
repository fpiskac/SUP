import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminReceptiPage() {

    const navigate = useNavigate();

    const [recepti, setRecepti] = useState([]);

    const [sastojci, setSastojci] = useState([]);

    const [naziv, setNaziv] = useState("");

    const [selectedSastojak, setSelectedSastojak] = useState("");

    const [kolicina, setKolicina] = useState("");

    const [receptSastojci, setReceptSastojci] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [brojKomada, setBrojKomada] = useState("");

    const token = localStorage.getItem("token");

    const fetchRecepti = async () => {

        try {

            const response = await axios.get(
                "https://localhost:7009/api/Recept",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRecepti(response.data);

        } catch (error) {

            console.log(error);
        }
    };

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

        fetchRecepti();

        fetchSastojci();

    }, []);

    const resetForm = () => {

        setNaziv("");

        setSelectedSastojak("");

        setKolicina("");

        setReceptSastojci([]);

        setEditingId(null);

        setBrojKomada("");
    };

    const handleAddSastojak = () => {

        if (!selectedSastojak || !kolicina) {
            return;
        }

        const sastojak = sastojci.find(
            s => s.idSastojak == selectedSastojak
        );

        const novi = {
            idSastojak: selectedSastojak,
            naziv: sastojak.naziv,
            kolicina: Number(kolicina)
        };

        setReceptSastojci([
            ...receptSastojci,
            novi
        ]);

        setSelectedSastojak("");

        setKolicina("");
    };

    const handleCreateOrUpdate = async (e) => {

        e.preventDefault();

        try {

            let receptId = editingId;

            if (editingId === null) {

                await axios.post(
                    "https://localhost:7009/api/Recept",
                    {
                        naziv,
                        brojKomada: Number(brojKomada)
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const sviRecepti = await axios.get(
                    "https://localhost:7009/api/Recept",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const zadnji =
                    sviRecepti.data[
                        sviRecepti.data.length - 1
                    ];

                receptId = zadnji.idRecept;

            } else {
                await axios.delete(
                    `https://localhost:7009/api/ReceptSastojak/recept/${editingId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                await axios.put(
                    `https://localhost:7009/api/Recept/${editingId}`,
                    {
                        naziv,
                        brojKomada: Number(brojKomada)
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            for (const rs of receptSastojci) {

                await axios.post(
                    "https://localhost:7009/api/ReceptSastojak",
                    {
                        idRecept: receptId,
                        idSastojak: rs.idSastojak,
                        kolicina: rs.kolicina
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            fetchRecepti();

            resetForm();

            setShowModal(false);

        } catch (error) {

            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        const potvrda = window.confirm(
            "Jeste li sigurni da želite izbrisati recept?"
        );

        if (!potvrda) {
            return;
        }

        try {

            await axios.delete(
                `https://localhost:7009/api/Recept/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchRecepti();

        } catch (error) {

            console.log(error);
        }
    };

    const handleEdit = async (recept) => {

            try {

                setEditingId(recept.idRecept);

                setNaziv(recept.naziv);


                const response = await axios.get(
                    `https://localhost:7009/api/ReceptSastojak/recept/${recept.idRecept}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const mapped =
                    response.data.map((rs) => ({
                        idSastojak: rs.idSastojak,
                        naziv: rs.nazivSastojka,
                        kolicina: rs.kolicina
                    }));

                setReceptSastojci(mapped);

                setShowModal(true);

                setBrojKomada(recept.brojKomada);

            } catch (error) {

                console.log(error);
            }
        };
    const handleRemoveSastojak = (index) => {

        const novi =
            [...receptSastojci];

        novi.splice(index, 1);

        setReceptSastojci(novi);
    };

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <h1>Recepti</h1>

                <table style={styles.table}>

                    <thead>

                        <tr>
                            <th>Naziv</th>
                            <th>Akcije</th>
                        </tr>

                    </thead>

                    <tbody>

                        {recepti.map((r) => (

                            <tr key={r.idRecept}>

                                <td>{r.naziv}</td>

                                <td>

                                    <div style={styles.actionButtons}>

                                        <button
                                            style={styles.editButton}
                                            onClick={() =>
                                                handleEdit(r)
                                            }
                                        >
                                            Uredi
                                        </button>

                                        <button
                                            style={styles.deleteButton}
                                            onClick={() =>
                                                handleDelete(r.idRecept)
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

                <div style={styles.addButtonContainer}>

                    <button
                        style={styles.openModalButton}
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                    >
                        Dodaj Recept
                    </button>

                </div>

                {showModal && (

                    <div style={styles.modalOverlay}>

                        <div style={styles.modal}>

                            <h2>
                                {editingId === null
                                    ? "Dodaj recept"
                                    : "Uredi recept"}
                            </h2>

                            <form
                                onSubmit={handleCreateOrUpdate}
                                style={styles.form}
                            >

                                <input
                                    type="text"
                                    placeholder="Naziv recepta"
                                    value={naziv}
                                    onChange={(e) =>
                                        setNaziv(e.target.value)
                                    }
                                    style={styles.input}
                                />

                                <input
                                    type="number"
                                    placeholder="Broj komada"
                                    value={brojKomada}
                                    onChange={(e) =>
                                        setBrojKomada(e.target.value)
                                    }
                                    style={styles.input}
                                />

                                <select
                                    value={selectedSastojak}
                                    onChange={(e) =>
                                        setSelectedSastojak(
                                            e.target.value
                                        )
                                    }
                                    style={styles.input}
                                >

                                    <option value="">
                                        Odaberi sastojak
                                    </option>

                                    {sastojci.map((s) => (

                                        <option
                                            key={s.idSastojak}
                                            value={s.idSastojak}
                                        >
                                            {s.naziv}
                                        </option>

                                    ))}

                                </select>

                                <input
                                    type="number"
                                    placeholder="Količina (g)"
                                    value={kolicina}
                                    onChange={(e) =>
                                        setKolicina(
                                            e.target.value
                                        )
                                    }
                                    style={styles.input}
                                />

                                <button
                                    type="button"
                                    style={styles.secondaryButton}
                                    onClick={handleAddSastojak}
                                >
                                    Dodaj sastojak
                                </button>

                                <div style={styles.sastojciLista}>

                                    {receptSastojci.map(
                                        (rs, index) => (

                                            <div
                                                key={index}
                                                style={styles.sastojakItem}
                                            >

                                                <span>
                                                    {rs.naziv}
                                                    {" - "}
                                                    {rs.kolicina} g
                                                </span>

                                                <button
                                                    type="button"
                                                    style={styles.removeButton}
                                                    onClick={() =>
                                                        handleRemoveSastojak(index)
                                                    }
                                                >
                                                    X
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                                <button
                                    type="submit"
                                    style={styles.addButton}
                                >
                                    Spremi recept
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
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        Povratak na Dashboard
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
    removeButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "6px 10px",
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
        width: "450px"
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

    sastojciLista: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "10px"
    },

    sastojakItem: {
        backgroundColor: "#f1f1f1",
        padding: "10px",
        borderRadius: "8px"
    },

    addButton: {
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    secondaryButton: {
        backgroundColor: "#1e90ff",
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
        justifyContent: "flex-end",
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

export default AdminReceptiPage;