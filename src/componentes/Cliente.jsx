import { useNavigate } from "react-router-dom";

export default function Cliente({ cliente, handleEliminar }) {
    const { nombre, email, empresa, telefono, id } = cliente;
    const navigate = useNavigate();

    return(
        <tr className={"border-b hover:bg-gray-50"}>
            <td className={"pl-5 py-2 border border-slate-300"}>{nombre}</td>
            <td className={"pl-5 border border-slate-300"}>
                <ul>
                    <li className={"my-2"}>Email: <span className={"font-medium"}>{email}</span></li>
                    <li className={"my-2"}>Teléfono: <span className={"font-medium"}>{telefono !== '' ? telefono : 'No hay datos del teléfono'}</span></li>
                </ul>
            </td>
            <td className={"pl-5 border border-slate-300 capitalize"}>{empresa}</td>
            <td className={"px-5 border border-slate-300"}>
                <button
                    className={"my-2 bg-blue-500 hover:bg-blue-600 block w-full p-2 uppercase font-bold text-xs text-white"}
                    type={"button"}
                    onClick={() => navigate(`/clientes/${id}`)}
                >Ver detalle</button>
                <button
                    className={"my-2 bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs"}
                    type={"button"}
                    onClick={()  => navigate(`/clientes/editar/${id}`)}
                >Editar</button>
                <button
                    className={"my-2 bg-red-500 hover:bg-red-600 block w-full p-2 uppercase font-bold text-xs text-white"}
                    type={"button"}
                    onClick={() => handleEliminar(id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}