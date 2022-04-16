import {Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Alerta from "./Alerta";

export default function Formulario() {
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

    const handleSubmit = valores => {
      console.log(valores)
    }

    return (
        <div className={"bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto"}>
            <h3 className={"text-grey-600 font-bold text-xl uppercase text-center"}>Agregar Cliente</h3>
            <Formik
                initialValues={{
                    nombre: '',
                    empresa: '',
                    email: '',
                    telefono: '',
                    notas: ''
                }}
                onSubmit={ values => {
                    handleSubmit(values)
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
                    return (
                <Form className={"mt-10"}>
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
                            placeHolder={"Nombre del cliente"}
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
                            placeHolder={"Nombre de la empresa"}
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
                            placeHolder={"Email de contacto"}
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
                            placeHolder={"Teléfono de contacto"}
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
                            placeHolder={"Notas del Cliente"}
                        />
                    </div>
                    <button
                        type={"submit"}
                        className={"mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"}
                    >Agregar cliente</button>
                </Form>
                )}}
            </Formik>
        </div>
    )
}