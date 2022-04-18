import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Spinner from "../componentes/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {faStickyNote} from "@fortawesome/free-solid-svg-icons";

export default function VerCliente() {
    const [cliente, setCliente] = useState('');
    const [cargando, setCargando] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setCargando(!cargando);
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
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
                <dl>
                    <dt className={"font-black text-4xl text-blue-900"}>Detalle de: {cliente.nombre}</dt>
                    <dd className={"mt-3"}>Todos los detalles cargados del cliente</dd>
                    <div className={"mt-5 bg-white w-full rounded-lg shadow md:max-w-2xl mx-auto p-10"}>
                        <dt className={"sr-only"}>Datos:</dt>
                        <dd className={"text-4xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}> <FontAwesomeIcon icon={faUser} className={"fa-xs"}  /> Cliente:</span> {cliente.nombre}</dd>
                        <dd className={"text-2xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}><FontAwesomeIcon icon={faEnvelope} className={"fa-xs"} /> Email:</span> {cliente.email}</dd>
                        <dd className={"text-2xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}><FontAwesomeIcon icon={faPhone} className={"fa-xs"} /> Teléfono:</span> {cliente.telefono !== '' ? cliente.telefono : 'No hay datos cargados en este campo'}</dd>
                        <dd className={"text-2xl my-3 text-gray-800 capitalize"}><span className={"uppercase font-bold text-gray-600"}><FontAwesomeIcon icon={faBuilding} className={"fa-xs"} /> Empresa:</span> {cliente.empresa}</dd>
                        <dd className={"text-2xl my-3 text-gray-800"}><span className={"uppercase font-bold text-gray-600"}><FontAwesomeIcon icon={faStickyNote} className={"fa-xs"} /> Notas:</span> {cliente.notas !== '' ? cliente.notas : 'No hay ninguna nota cargada'}</dd>
                    </div>
                </dl>
            )
    )
}