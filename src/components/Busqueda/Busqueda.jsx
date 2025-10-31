import './Busqueda.css';


export default function Busqueda() {
    return (
        <div className="busqueda">
            <input className='in' type="text" placeholder='Buscar artistas, grupos, pistas y podcasts' />
            <p>O</p>
            <button className='btn-pista'>Sube tu propia pista </button>
        </div>
    )
}