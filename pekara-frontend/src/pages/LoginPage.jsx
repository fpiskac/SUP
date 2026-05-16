import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    const [korisnickoIme, setKorisnickoIme] = useState("");
    const [lozinka, setLozinka] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://localhost:7009/api/auth/login",
                {
                    korisnickoIme,
                    lozinka
                }
            );
            console.log(response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    idKorisnik: response.data.idKorisnik,
                    korisnickoIme: response.data.username,
                    role: response.data.role
                })
            );

           

            const role = response.data.role.toLowerCase();
                console.log(role);
            if (role === "admin") {
                navigate("/admin");
            }
            else if (role === "radnik") {
                navigate("/radnik");
            }
            else if (role === "prodavac") {
                navigate("/prodavac");
            }

        } catch (error) {

            console.log(error);

            alert("Pogrešan login.");
        }
    };

    return (
        <div style={styles.page}>

            <div style={styles.loginBox}>

                <h1 style={styles.title}>
                    Bakery App
                </h1>

                <form
                    onSubmit={handleLogin}
                    style={styles.form}
                >

                    <input
                        type="text"
                        placeholder="Korisničko ime"
                        value={korisnickoIme}
                        onChange={(e) =>
                            setKorisnickoIme(e.target.value)
                        }
                        style={styles.input}
                    />

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
                        style={styles.button}
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}
const styles = {

    page: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },

    loginBox: {
        width: "400px",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.1)"
    },

    title: {
        textAlign: "center",
        marginBottom: "30px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px"
    },

    button: {
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#222",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
    }
};

export default LoginPage;