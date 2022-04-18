export default function Alerta({ children, success}) {
    return (
        <div className={`${success ? 'bg-green-600' : 'bg-red-600'} text-center mt-4 text-white uppercase font-bold p-3`}>
            {children}
        </div>
    )
}