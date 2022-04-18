import {useEffect, useState} from "react";
import Cliente from "../componentes/Cliente";
import Spinner from "../componentes/Spinner";

export default function HomeClientes() {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        setCargando(!cargando)
        const obtenerClientesAPI = async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setClientes(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        }
        obtenerClientesAPI();
    },[]);

    const handleEliminar = async id => {
        const confirmar = confirm('¿Desea eliminar a este cliente?');

        if (confirmar) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url,{
                    method: 'DELETE'
                });
                await respuesta.json();
                const arrayClientes = clientes.filter( cliente => cliente.id !== id);
                setClientes(arrayClientes);
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <>
            <h2 className={"font-black text-4xl text-blue-900"}>Clientes</h2>
            <p className={"mt-3"}>Administra tus clientes</p>
            <table className={"w-full mt-5 table-auto shadow bg-white"}>
                <thead className={"bg-blue-800 text-white"}>
                    <tr>
                        <th className={"p-2 border border-slate-300"}>Nombre</th>
                        <th className={"p-2 border border-slate-300"}>Contacto</th>
                        <th className={"p-2 border border-slate-300"}>Empresa</th>
                        <th className={"p-2 border border-slate-300"}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                { cargando ?
                    <tr>
                        <td colSpan={"4"}>
                            <Spinner />
                        </td>
                    </tr>
                    :
                    Object.keys(clientes).length > 0 ?
                        clientes.map( cliente => (
                            <Cliente
                                key={cliente.id}
                                cliente={cliente}
                                handleEliminar={handleEliminar}
                            />
                        ))
                    :
                        <tr>
                            <td colSpan={"4"} className={"text-center text-2xl font-bold py-5"}>No hay ningún cliente cargado</td>
                        </tr>
                }
                </tbody>
            </table>
        </>
    )
}