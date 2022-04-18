import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./layout/Layout";
import HomeClientes from "./paginas/HomeClientes";
import NuevoCliente from "./paginas/NuevoCliente";
import EditarCliente from "./paginas/EditarCliente";
import VerCliente from "./paginas/VerCliente";
import Inicio from "./paginas/Inicio";
import {useState} from "react";

function App() {
    const [logueado, setLogueado] = useState(false);

    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/"}
                    element={<Inicio
                        setLogueado={setLogueado}
                    />}
                />
                <Route
                    path={"/clientes"}
                    element={ logueado ? (<Layout setLogueado={setLogueado} />) : (<Navigate replace to={"/"} />) }
                >
                    <Route
                        index
                        element={<HomeClientes />}
                    />
                    <Route
                        path={"nuevo"}
                        element={<NuevoCliente />}
                    />
                    <Route
                        path={"editar/:id"}
                        element={<EditarCliente />}
                    />
                    <Route
                        path={":id"}
                        element={<VerCliente />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
