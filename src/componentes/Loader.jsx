import './Loader.css';

export default function Loader({children}) {
    return (
        <div className="loader"><span className={"sr-only"}>{children}</span></div>
    )
}