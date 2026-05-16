import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import AdminRadniciPage from "./pages/AdminRadniciPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminSastojciPage from "./pages/AdminSastojciPage";
import AdminReceptiPage from "./pages/AdminReceptiPage";
import AdminProizvodiPage from "./pages/AdminProizvodiPage";
import RadnikSmjenaPage from "./pages/RadnikSmjenaPage";
import RadnikProizvodnjaPage from "./pages/RadnikProizvodnjaPage";
import ProdavacOdabirPage from "./pages/ProdavacOdabirPage";
import ProdavacProdajaPage from "./pages/ProdavacProdajaPage"
import AdminEvidencijaPage from "./pages/AdminEvidencijaPage";
import AdminEvidencijaPregledPage from "./pages/AdminEvidencijaPregledPage";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/radnik"
                    element={
                        <ProtectedRoute allowedRoles={["radnik"]}>
                            <RadnikSmjenaPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/prodavac"
                    element={
                        <ProtectedRoute allowedRoles={["prodavac"]}>
                            <ProdavacOdabirPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />

                <Route
                    path="/admin/radnici"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminRadniciPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/sastojci"
                    element={<AdminSastojciPage />}
                />
                <Route
                    path="/admin/recepti"
                    element={<AdminReceptiPage />}
                />
                <Route
                    path="/admin/proizvodi"
                    element={<AdminProizvodiPage />}
                />
                <Route
                    path="/radnik/smjena"
                    element={<RadnikSmjenaPage />}
                />
                <Route
                    path="/radnik/proizvodnja"
                    element={<RadnikProizvodnjaPage />}
                />

                <Route
                    path="/prodavac/odabir"
                    element={<ProdavacOdabirPage />}
                />

                <Route
                    path="/prodavac/prodaja"
                    element={<ProdavacProdajaPage />}
                />
                <Route
                    path="/admin/evidencija"
                    element={<AdminEvidencijaPage />}
                />

                <Route
                    path="/admin/evidencija/pregled"
                    element={
                        <AdminEvidencijaPregledPage />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;