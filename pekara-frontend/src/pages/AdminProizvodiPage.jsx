import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function AdminProizvodiPage() {

    const navigate = useNavigate();

    const [proizvodi, setProizvodi] = useState([]);

    const [recepti, setRecepti] = useState([]);

    const [naziv, setNaziv] = useState("");

    const [tezinaKg, setTezinaKg]
        = useState("");

    const [tezinaG, setTezinaG]
        = useState("");

    const [cijenaEuri, setCijenaEuri]
        = useState("");

    const [cijenaCenti, setCijenaCenti]
        = useState("");

    const [selectedRecept,
        setSelectedRecept]
        = useState("");

    const [editingId, setEditingId]
        = useState(null);

    const [showModal, setShowModal]
        = useState(false);

    const token =
        localStorage.getItem("token");

    const fetchProizvodi = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/Proizvod`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setProizvodi(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchRecepti = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/Recept`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setRecepti(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProizvodi();

        fetchRecepti();

    }, []);

    const resetForm = () => {

        setNaziv("");

        setTezinaKg("");

        setTezinaG("");

        setCijenaEuri("");

        setCijenaCenti("");

        setSelectedRecept("");

        setEditingId(null);
    };

    const handleCreateOrUpdate =
        async (e) => {

            e.preventDefault();

            const data = {

                naziv,

                tezinaPoKomadu:
                    (Number(tezinaKg) * 1000)
                    + Number(tezinaG),

                prodajnaCijena:
                    Number(cijenaEuri)
                    + (Number(cijenaCenti) / 100),

                idRecept:
                    Number(selectedRecept)
            };

            try {

                if (editingId === null)
                {
                    await axios.post(
                        `${import.meta.env.VITE_API_URL}/Proizvod`,
                        data,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );
                }
                else
                {
                    await axios.put(
                        `${import.meta.env.VITE_API_URL}/Proizvod/${editingId}`,
                        data,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );
                }

                fetchProizvodi();

                resetForm();

                setShowModal(false);

            } catch (error) {

                console.log(error);
            }
        };

    const handleDelete = async (id) => {

        const potvrda =
            window.confirm(
                "Jeste li sigurni?"
            );

        if (!potvrda)
            return;

        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/Proizvod/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchProizvodi();

        } catch (error) {

            console.log(error);
        }
    };

    const handleEdit = (proizvod) => {

        setEditingId(
            proizvod.idProizvod
        );

        setNaziv(proizvod.naziv);

        const ukupnoGrama =
            Number(proizvod.tezinaPoKomadu);

        const kg =
            Math.floor(ukupnoGrama / 1000);

        const g =
            ukupnoGrama % 1000;

        setTezinaKg(kg);

        setTezinaG(g);

        const cijena =
            Number(proizvod.prodajnaCijena);

        const euri =
            Math.floor(cijena);

        const centi =
            Math.round((cijena - euri) * 100);

        setCijenaEuri(euri);

        setCijenaCenti(centi);

        setSelectedRecept(
            proizvod.idRecept
        );

        setShowModal(true);
    };

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <div style={styles.topBar}>

                    <h1>Proizvodi</h1>

                </div>

                <table style={styles.table}>

                    <thead>

                        <tr>

                            <th>Naziv</th>

                            <th>Težina</th>

                            <th>Izrada</th>

                            <th>Prodaja</th>

                            <th>Izrada/kg</th>

                            <th>Prodaja/kg</th>

                            <th>Recept</th>

                            <th>Akcije</th>

                        </tr>

                    </thead>

                    <tbody>

                        {proizvodi.map((p) => (

                            <tr
                                key={
                                    p.idProizvod
                                }
                            >

                                <td>{p.naziv}</td>

                                <td>
                                    {
                                        p.tezinaPoKomadu
                                    } g
                                </td>

                                <td>
                                    {
                                        Number(
                                            p.izradaCijena
                                        ).toFixed(2)
                                    } €
                                </td>

                                <td>
                                    {
                                        Number(
                                            p.prodajnaCijena
                                        ).toFixed(2)
                                    } €
                                </td>

                                <td>
                                    {
                                        Number(
                                            p.cijenaPoKg
                                        ).toFixed(2)
                                    } €
                                </td>

                                <td>
                                    {
                                        Number(
                                            p.prodajnaPoKg
                                        ).toFixed(2)
                                    } €
                                </td>

                                <td>
                                    {
                                        p.receptNaziv
                                    }
                                </td>

                                <td>

                                    <button
                                        style={
                                            styles.editButton
                                        }
                                        onClick={() =>
                                            handleEdit(p)
                                        }
                                    >
                                        Uredi
                                    </button>

                                    <button
                                        style={
                                            styles.deleteButton
                                        }
                                        onClick={() =>
                                            handleDelete(
                                                p.idProizvod
                                            )
                                        }
                                    >
                                        Izbriši
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <div
                    style={
                        styles.bottomContainer
                    }
                >

                    <button
                        style={
                            styles.backButton
                        }
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        Povratak na Dashboard
                    </button>

                    <button
                        style={styles.addButton}
                        onClick={() => {

                            resetForm();

                            setShowModal(true);
                        }}
                    >
                        Dodaj proizvod
                    </button>

                </div>

                {showModal && (

                    <div style={styles.modal}>

                        <div
                            style={
                                styles.modalContent
                            }
                        >

                            <h2>

                                {
                                    editingId === null
                                        ? "Dodaj proizvod"
                                        : "Uredi proizvod"
                                }

                            </h2>

                            <form
                                onSubmit={
                                    handleCreateOrUpdate
                                }
                                style={
                                    styles.form
                                }
                            >

                                <input
                                    type="text"
                                    placeholder="Naziv"
                                    value={naziv}
                                    onChange={(e) =>
                                        setNaziv(
                                            e.target.value
                                        )
                                    }
                                    style={
                                        styles.input
                                    }
                                />

                                <div style={styles.row}>

                                    <input
                                        type="number"
                                        placeholder="Kg"
                                        value={tezinaKg}
                                        onChange={(e) =>
                                            setTezinaKg(e.target.value)
                                        }
                                        style={styles.input}
                                    />

                                    <input
                                        type="number"
                                        placeholder="g"
                                        value={tezinaG}
                                        onChange={(e) =>
                                            setTezinaG(e.target.value)
                                        }
                                        style={styles.input}
                                    />

                                </div>

                                <div style={styles.row}>

                                    <input
                                        type="number"
                                        placeholder="Euri"
                                        value={cijenaEuri}
                                        onChange={(e) =>
                                            setCijenaEuri(e.target.value)
                                        }
                                        style={styles.input}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Centi"
                                        value={cijenaCenti}
                                        onChange={(e) =>
                                            setCijenaCenti(e.target.value)
                                        }
                                        style={styles.input}
                                    />

                                </div>

                                <select
                                    value={
                                        selectedRecept
                                    }
                                    onChange={(e) =>
                                        setSelectedRecept(
                                            e.target.value
                                        )
                                    }
                                    style={
                                        styles.input
                                    }
                                >

                                    <option value="">
                                        Odaberi recept
                                    </option>

                                    {recepti.map((r) => (

                                        <option
                                            key={
                                                r.idRecept
                                            }
                                            value={
                                                r.idRecept
                                            }
                                        >
                                            {r.naziv}
                                        </option>

                                    ))}

                                </select>

                                <button
                                    type="submit"
                                    style={
                                        styles.saveButton
                                    }
                                >

                                    Spremi

                                </button>

                                <button
                                    type="button"
                                    style={
                                        styles.cancelButton
                                    }
                                    onClick={() =>
                                        setShowModal(
                                            false
                                        )
                                    }
                                >

                                    Odustani

                                </button>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

const styles = {

    container: {
        padding: "40px"
    },

    topBar: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    addButton: {
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    editButton: {
        backgroundColor: "#f59e0b",
        color: "white",
        border: "none",
        padding: "8px 12px",
        marginRight: "10px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    deleteButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    backButton: {
        backgroundColor: "#222",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    bottomContainer: {
        marginTop: "40px",
        display: "flex",
        justifyContent: "space-between"
    },

    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    modalContent: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "400px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    },

    saveButton: {
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    cancelButton: {
        backgroundColor: "gray",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    row: {
    display: "flex",
    gap: "10px"
    }
};

export default AdminProizvodiPage;