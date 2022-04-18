import FormLogin from "../componentes/FormLogin";

export default function Inicio({setLogueado}) {
    return (
        <div className={"h-full flex md:min-h-screen bg-blue-900 items-center justify-center flex-col"}>
            <h1 className={"text-white text-5xl text-center font-black"}>Bienvenido al CRM de Clientes</h1>
            <FormLogin
                setLogueado={setLogueado}
            />
        </div>
    )
}