import { Link } from "react-router-dom";

export default function Inicio() {
    return (
        <div className={"h-full flex md:min-h-screen bg-blue-900 items-center justify-center flex-col"}>
            <h1 className={"text-white text-5xl text-center font-black"}>Bienvenido al CRM de Clientes</h1>
            <Link
                to={"/clientes"}
                className={"mt-10 bg-transparent hover:text-blue-900 hover:bg-white text-white font-semibold hover:text-white py-2 px-4 border border-white rounded transition"}
            >Navegar por el sitio</Link>
        </div>
    )
}