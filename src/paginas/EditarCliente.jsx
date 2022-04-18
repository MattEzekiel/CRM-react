import Formulario from "../componentes/Formulario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../componentes/Spinner";

export default function EditarCliente() {
    const [cliente, setCliente] = useState('');
    const [cargando, setCargando] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setCargando(!cargando);
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error)
            }
            setCargando(false);
        }
        obtenerClienteAPI();
    },[]);

    return (
        cargando ?
            <Spinner />
            :
            cliente?.nombre ? (
                <>
                    <h2 className={"font-black text-4xl text-blue-900"}>Editar Cliente</h2>
                    <p className={"mt-3"}>Utiliza los siguientes campos para editar al cliente</p>
                    <Formulario
                        cliente={cliente}
                        cargando={cargando}
                    />
                </>
            )
            :
            (<h2 className={"font-black text-4xl text-blue-900"}>El cliente que busca no existe</h2>)
    )
}