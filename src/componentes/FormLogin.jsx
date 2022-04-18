import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Loader from "./Loader";
import Alerta from "./Alerta";

export default function FormLogin({setLogueado}) {
    const [success, setSuccess] = useState(true);
    const [procesando, setProcensando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async data => {
      setProcensando(!procesando);

      const url = import.meta.env.VITE_USER_URL;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      const searchUsuario = resultado.filter( usuario => usuario.email === data.email && usuario.password === data.password);

      if (Object.keys(searchUsuario).length > 0) {
        setLogueado(true);
        navigate('/clientes');
      } else {
          setSuccess(false);
      }

      setProcensando(false);
    }

    return (
        <div className={"bg-white mt-10 px-5 py-10 rounded-md shadow-md md:max-w-md w-full mx-auto"}>
            <h2 className={"text-grey-600 font-bold text-2xl uppercase text-center"}>Iniciar Sesión</h2>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={ async values => {
                    await handleSubmit(values);
                }}
            >
                <Form className={"mt-10"}>
                    { !success && (
                        <Alerta>Los datos ingresados son incorrectos</Alerta>
                    )}
                    <div className={"mb-4 mt-5"}>
                        <label htmlFor="email">Email</label>
                        <Field
                            className={"mt-2 block w-full p-3 bg-gray-200"}
                            type={"email"}
                            name={"email"}
                            id={"email"}
                            placeholder={"Ingrese su email"}
                        />
                    </div>
                    <div className={"mb-4"}>
                        <label htmlFor="password">Contraseña</label>
                        <Field
                            className={"mt-2 block w-full p-3 bg-gray-200"}
                            type={"password"}
                            name={"password"}
                            id={"password"}
                            placeholder={"Ingrese su email"}
                        />
                    </div>
                    { !procesando ?
                        (<button
                            type={"submit"}
                            className={"mt-5 w-full bg-blue-700 hover:bg-blue-800 p-3 text-white uppercase font-bold text-lg"}
                        >Iniciar</button>)
                        :
                        (<button
                            disabled
                            type={"button"}
                            className={"mt-5 w-full flex justify-center cursor-wait items-center text-center bg-blue-800 disabled:opacity-80 p-3 text-white uppercase font-bold text-lg"}
                        ><Loader>Iniciando...</Loader> Iniciando...</button>)
                    }
                </Form>
            </Formik>
        </div>
    )
}