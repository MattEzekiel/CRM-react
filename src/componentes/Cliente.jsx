import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Cliente({ cliente, handleEliminar }) {
    const { nombre, email, empresa, telefono, id } = cliente;
    const navigate = useNavigate();

    return(
        <tr className={"border-b hover:bg-gray-50"}>
            <td className={"py-2 border border-slate-300 text-center text-xl font-medium"}>{nombre}</td>
            <td className={"pl-5 border border-slate-300"}>
                <ul>
                    <li className={"my-2"}>Email: <span className={"font-medium"}>{email}</span></li>
                    <li className={"my-2"}>Teléfono: <span className={"font-medium"}>{telefono !== '' ? telefono : 'No hay datos del teléfono'}</span></li>
                </ul>
            </td>
            <td className={"border border-slate-300 capitalize text-center font-medium text-2xl"}>{empresa}</td>
            <td className={"px-5 border border-slate-300"}>
                <button
                    className={"my-3 rounded bg-blue-500 hover:bg-blue-600 block w-full p-2 uppercase font-bold text-xs text-white"}
                    type={"button"}
                    onClick={() => navigate(`/clientes/${id}`)}
                ><FontAwesomeIcon icon={faEye} className={"fa-sm"} /> Ver detalle</button>
                <button
                    className={"my-3 rounded bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs"}
                    type={"button"}
                    onClick={()  => navigate(`/clientes/editar/${id}`)}
                ><FontAwesomeIcon icon={faPen} className={"fa-sm"} /> Editar</button>
                <button
                    className={"my-3 rounded bg-red-500 hover:bg-red-600 block w-full p-2 uppercase font-bold text-xs text-white"}
                    type={"button"}
                    onClick={() => handleEliminar(id)}
                ><FontAwesomeIcon icon={faTrash} className={"fa-sm"} /> Eliminar</button>
            </td>
        </tr>
    )
}