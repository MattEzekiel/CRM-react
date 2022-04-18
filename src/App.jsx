import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from "./layout/Layout";
import Home from "./paginas/Home";
import NuevoCliente from "./paginas/NuevoCliente";
import EditarCliente from "./paginas/EditarCliente";
import VerCliente from "./paginas/VerCliente";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/clientes"}
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<Home />}
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
