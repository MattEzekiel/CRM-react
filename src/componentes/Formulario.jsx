import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Alerta from "./Alerta";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Spinner from "./Spinner";

export default function Formulario({ cliente, cargando }) {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3,'El nombre es muy corto')
            .max(40,'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
            .required('El campo empresa es obligatorio'),
        email: Yup.string()
            .email('El email no es válido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .positive('Número no válido')
            .integer('Número no válido')
            .typeError('El número no es válido'),
        notas: Yup.string()
            .typeError('Campo no válido'),
    });

    const handleSubmit = async valores => {
        try {
            let respuesta;

            if (cliente.id) {
                // Editar Cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } else {
                // Nuevo Cliente
                const url = 'http://localhost:4000/clientes';
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            const resultado = await respuesta.json();

            if (resultado.id) {
                setSuccess(true);
            }

            setTimeout(() => {
                navigate('/clientes');
            },3000);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
        <div className={"bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto"}>
            <h3 className={"text-grey-600 font-bold text-xl uppercase text-center"}>{cliente?.nombre ? 'Editar' : 'Agregar'} Cliente</h3>
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values);
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
                    return (
                <Form className={"mt-10"}>
                    { success && (
                        <div className={"mb-4"}>
                            <Alerta
                                success={success}
                            >Cliente {cliente?.nombre ? 'editado' : 'añadido'} correctamente</Alerta>
                        </div>
                    )}
                    <div className={"mb-4"}>
                        <label
                            htmlFor={"nombre"}
                            className={"text-gray-800"}
                        >Nombre</label>
                        <Field
                            className={"mt-2 block w-full p-3 bg-gray-200"}
                            type={"text"}
                            name={"nombre"}
                            id={"nombre"}
                            placeholder={"Nombre del cliente"}
                        />
                        { errors.nombre && touched.nombre ? (
                            <Alerta>
                                {errors.nombre}
                            </Alerta>
                        ) : null}
                    </div>
                    <div className={"mb-4"}>
                        <label
                            htmlFor={"empresa"}
                            className={"text-gray-800"}
                        >Empresa</label>
                        <Field
                            className={"mt-2 block w-full p-3 bg-gray-200"}
                            type={"text"}
                            name={"empresa"}
                            id={"empresa"}
                            placeholder={"Nombre de la empresa"}
                        />
                        { errors.empresa && touched.empresa ? (
                            <Alerta>
                                {errors.empresa}
                            </Alerta>
                        ) : null}
                    </div>
                    <div className={"mb-4"}>
                        <label
                            htmlFor={"email"}
                            className={"text-gray-800"}
                        >E-mail</label>
                        <Field
                            className={"mt-2 block w-full p-3 bg-gray-200"}
                            type={"text"}
                            name={"email"}
                            id={"email"}
                            placeholder={"Email de contacto"}
                        />
                        { errors.email && touched.email ? (
                            <Alerta>
                                {errors.email}
                            </Alerta>
                        ) : null}
                    </div>
                    <div className={"mb-4"}>
                        <label
                            htmlFor={"telefono"}
                            className={"text-gray-800"}
                        >Teléfono</label>
                        <Field
                            className={"mt-2 block w-full p-3 bg-gray-200"}
                            type={"tel"}
                            name={"telefono"}
                            id={"telefono"}
                            placeholder={"Teléfono de contacto"}
                        />
                        { errors.telefono && touched.telefono ? (
                            <Alerta>
                                {errors.telefono}
                            </Alerta>
                        ) : null}
                    </div>
                    <div className={"mb-4"}>
                        <label
                            htmlFor={"notas"}
                            className={"text-gray-800"}
                        >Notas</label>
                        <Field
                            as={"textarea"}
                            className={"mt-2 block w-full p-3 bg-gray-200 h-40"}
                            type={"text"}
                            name={"notas"}
                            id={"notas"}
                            placeholder={"Notas del Cliente"}
                        />
                    </div>
                    <button
                        type={"submit"}
                        className={"mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"}
                    >{cliente?.nombre ? 'Guardar cambios' : 'Agregar cliente'}</button>
                </Form>
                )}}
            </Formik>
        </div>
        )
    )
}