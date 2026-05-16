import { useEffect, useState } from "react";

import axios from "axios";

import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";

function RadnikProizvodnjaPage() {

    const location = useLocation();

    const {
        datum,
        tipSmjene
    } = location.state;

    const [proizvodi, setProizvodi]
        = useState([]);

    const [kolicine, setKolicine]
        = useState({});

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    useEffect(() => {

        fetchProizvodi();

    }, []);

    const fetchProizvodi = async () => {

        try {

            const response =
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/Proizvod`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setProizvodi(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange =
        (id, value) => {

            setKolicine({
                ...kolicine,
                [id]: value
            });
        };

    const handleSave =
        async () => {

            try {

                const smjenaResponse =
                    await axios.post(
                        `${import.meta.env.VITE_API_URL}/Smjena`,
                        {
                            datum,
                            tipSmjene
                        },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                    console.log(smjenaResponse.data);
                const smjenaId =
                    smjenaResponse.data.idSmjena;    

                for (const proizvod of proizvodi)
                {
                    const prodano =
                        Number(
                            kolicine[
                                proizvod.idProizvod
                            ] || 0
                        );

                    if (prodano <= 0)
                        continue;
                   
                    await axios.post(
                        `${import.meta.env.VITE_API_URL}/Evidencija`,
                        {
                            idSmjena:
                                smjenaId,

                            idProizvod:
                                proizvod.idProizvod,

                            proizvedeno: 0,

                            prodano,

                            idRadnik: null,

                            idProdavac: user.idKorisnik
                        },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );
                }

                alert(
                    "Proizvodnja spremljena!"
                );

            } catch (error) {

                console.log(error);
            }
        };

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <h1>
                    Neprodani proizvodi
                </h1>

                <h3>
                    {datum}
                    {" - "}
                    {tipSmjene}
                </h3>

                <table style={styles.table}>

                    <thead>

                        <tr>

                            <th>Proizvod</th>

                            <th>Ostalo</th>

                        </tr>

                    </thead>

                    <tbody>

                        {proizvodi.map((p) => (

                            <tr
                                key={
                                    p.idProizvod
                                }
                            >

                                <td>
                                    {p.naziv}
                                </td>

                                <td>

                                    <input
                                        type="number"
                                        value={
                                            kolicine[
                                                p.idProizvod
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                p.idProizvod,
                                                e.target.value
                                            )
                                        }
                                        style={
                                            styles.input
                                        }
                                    />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <button
                    style={styles.button}
                    onClick={handleSave}
                >
                    Spremi
                </button>

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

    input: {
        padding: "10px",
        width: "100px"
    },

    button: {
        marginTop: "30px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "14px 20px",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default RadnikProizvodnjaPage;