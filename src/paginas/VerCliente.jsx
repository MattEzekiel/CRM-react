import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Spinner from "../componentes/Spinner";

export default function VerCliente() {
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
            Object.keys(cliente).length === 0 ? <h2 className={"font-black text-4xl text-blue-900"}>No hay resultados</h2> : (
                <div>
                    <h2 className={"font-black text-4xl text-blue-900"}>Detalle de: {cliente.nombre}</h2>
                    <p className={"mt-3"}>Todos los detalles cargados del cliente</p>
                    <ul className={"mt-5"}>
                        <li className={"text-4xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}>Cliente:</span> {cliente.nombre}</li>
                        <li className={"text-2xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}>Email:</span> {cliente.email}</li>
                        <li className={"text-2xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}>Teléfono:</span> {cliente.telefono !== '' ? cliente.telefono : 'No hay datos cargados en este campo'}</li>
                        <li className={"text-2xl my-3 text-gray-800 capitalize"}><span className={"uppercase font-bold text-gray-600"}>Empresa:</span> {cliente.empresa}</li>
                        <li className={"text-2xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}>Notas:</span> {cliente.notas !== '' ? cliente.notas : 'No hay ninguna nota cargada'}</li>
                    </ul>
                </div>
            )
    )
}