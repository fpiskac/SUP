import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function ProdavacOdabirPage() {

    const navigate = useNavigate();

    const [datum, setDatum]
        = useState("");

    const [tipSmjene, setTipSmjene]
        = useState("Jutro");

    const handleSubmit = () => {

        navigate(
            "/prodavac/prodaja",
            {
                state: {
                    datum,
                    tipSmjene
                }
            }
        );
    };

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <h1>
                    Odabir smjene
                </h1>

                <div style={styles.form}>

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

                    <button
                        style={styles.button}
                        onClick={handleSubmit}
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
        padding: "40px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "300px"
    },

    input: {
        padding: "12px"
    },

    button: {
        padding: "12px",
        backgroundColor: "#222",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default ProdavacOdabirPage;