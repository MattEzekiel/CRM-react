import {Link, Outlet, useLocation} from 'react-router-dom'

export default function Layout({setLogueado}) {
    const location = useLocation();

    const urlActual = location.pathname;

    return (
        <main className={"md:flex md:min-h-screen"}>
            <div className={"md:w-1/4 bg-blue-900 px-5 py-10 flex flex-col justify-between"}>
                <div>
                    <h2 className={"text-4xl text-white font-black text-center"}>CRM - Clientes</h2>
                    <nav className={"mt-10"}>
                        <Link
                            className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 transition-colors`}
                            to={"/clientes"}>Clientes</Link>
                        <Link
                            className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 transition-colors`}
                            to={"/clientes/nuevo"}>Nuevo Cliente</Link>
                    </nav>
                </div>
                <div>
                    <Link
                        className={"text-white text-2xl block mt-2 hover:text-blue-300 transition-colors"}
                        onClick={() => setLogueado(false)}
                        to={"/"}
                    >Cerrar sesión</Link>
                </div>
            </div>
            <div className={"md:w-3/4 px-5 py-10 md:h-screen overflow-auto"}>
                <Outlet />
            </div>
        </main>
    )
}