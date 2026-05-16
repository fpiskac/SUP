import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function RadnikSmjenaPage() {

    const navigate = useNavigate();

    const [tipSmjene, setTipSmjene]
        = useState("Jutro");

    const [datum, setDatum]
        = useState("");

    const handleOdaberi = () => {

        navigate(
            "/radnik/proizvodnja",
            {
                state: {
                    tipSmjene,
                    datum
                }
            }
        );
    };

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <div style={styles.card}>

                    <h1>Odabir smjene</h1>

                    <select
                        value={tipSmjene}
                        onChange={(e) =>
                            setTipSmjene(
                                e.target.value
                            )
                        }
                        style={styles.input}
                    >

                        <option value="Jutro">
                            Jutro
                        </option>

                        <option value="Podne">
                            Podne
                        </option>

                    </select>

                    <input
                        type="date"
                        value={datum}
                        onChange={(e) =>
                            setDatum(
                                e.target.value
                            )
                        }
                        style={styles.input}
                    />

                    <button
                        style={styles.button}
                        onClick={handleOdaberi}
                    >
                        Odaberi
                    </button>

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    card: {
        width: "400px",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc"
    },

    button: {
        backgroundColor: "#222",
        color: "white",
        border: "none",
        padding: "14px",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default RadnikSmjenaPage;