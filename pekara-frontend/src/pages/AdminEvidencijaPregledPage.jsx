import { useEffect, useState } from "react";

import axios from "axios";

import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";

function AdminEvidencijaPregledPage() {

    const location = useLocation();

    const {
        datum,
        tipSmjene
    } = location.state;

    const [evidencija, setEvidencija]
        = useState([]);

    const token =
        localStorage.getItem("token");

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const response =
                await axios.get(
                    `https://localhost:7009/api/Evidencija/pregled?datum=${datum}&tipSmjene=${tipSmjene}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const grupirano = {};

            response.data.forEach((e) => {

                const naziv = e.naziv;

                if (!grupirano[naziv]) {

                    grupirano[naziv] = {
                        naziv,

                        proizvedeno: 0,

                        prodano: 0,

                        izradaCijena:
                            e.izradaCijena || 0,

                        prodajnaCijena:
                            e.prodajnaCijena || 0
                    };
                }

                grupirano[naziv].proizvedeno +=
                    e.proizvedeno || 0;

                grupirano[naziv].prodano +=
                    e.prodano || 0;
            });

            setEvidencija(
                Object.values(grupirano)
            );

        } catch (error) {

            console.log(error);
        }
    };

    const ukupnoProizvedeno =
        evidencija.reduce(
            (sum, e) =>
                sum +
                (
                    (e.proizvedeno || 0)
                    *
                    (e.izradaCijena || 0)
                ),
            0
        );

    const ukupnoProdano =
        evidencija.reduce(
            (sum, e) =>
                sum +
                (
                    (e.proizvedeno-e.prodano || 0)
                    *
                    (e.prodajnaCijena || 0)
                ),
            0
        );

    const profit =
        ukupnoProdano
        -
        ukupnoProizvedeno;

    return (
        <div>

            <Navbar />

            <div style={styles.container}>

                <h1>
                    Evidencija
                </h1>

                <h3>
                    {datum}
                    {" - "}
                    {tipSmjene}
                </h3>

                <table style={styles.table}>

                    <thead>

                        <tr>

                            <th>
                                Proizvod
                            </th>

                            <th>
                                Proizvedeno
                            </th>

                            <th>
                                Ostalo
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {evidencija.map(
                            (e, index) => (

                            <tr key={index}>

                                <td>
                                    {e.naziv}
                                </td>

                                <td>
                                    {
                                        e.proizvedeno
                                        || 0
                                    }
                                </td>

                                <td>
                                    {
                                        e.prodano
                                        || 0
                                    }
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <div style={styles.summary}>

                    <h3>
                        Ukupna cijena
                        proizvedenih:
                        {" "}
                        {
                            ukupnoProizvedeno
                            .toFixed(2)
                        }
                        €
                    </h3>

                    <h3>
                        Ukupna cijena
                        prodanih:
                        {" "}
                        {
                            ukupnoProdano
                            .toFixed(2)
                        }
                        €
                    </h3>

                    <h2>
                        Profit:
                        {" "}
                        {
                            profit.toFixed(2)
                        }
                        €
                    </h2>

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

    summary: {
        marginTop: "40px"
    }
};

export default AdminEvidencijaPregledPage;