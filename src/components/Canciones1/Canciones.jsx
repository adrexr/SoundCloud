import img from "../../img/feel.jpeg"
import img2 from "../../img/Cowgirl.jpg"
import img3 from "../../img/serenity.jpg"
import img4 from "../../img/sycamore.jpeg"
import img5 from "../../img/just.jpg"
import './canciones.css'
import { Link } from 'react-router-dom';


export default function Canciones() {
    return (
        <div className="principal">
            <div className="carta-canciones">
                <div className="carta1">
                    <img src={img} alt="" />
                    <p>I Feel Like Slapping a N*** </p>
                    <p className="auto">Christopher Adjetey</p>
                </div>
                <div className="carta2">
                    <img src={img2} alt="" />
                    <p>Cowgirl Trailride</p>
                    <p className="auto">DJ-A.N.T.</p>
                </div>
                <div className="carta3">
                    <img src={img3} alt="" />
                    <p>Serenity</p>
                    <p className="auto">J.P.</p>
                </div>
                <div className="carta4">
                    <img src={img4} alt="" />
                    <p>Sycamore Tree</p>
                    <p className="auto">Khamari</p>
                </div>
                <div className="carta5">
                    <img src={img5} alt="" />
                    <p>Just Wanna Be Your Girl</p>
                    <p className="auto">prod.6</p>
                </div>
            </div>
            <button  className="explore-button-link">
                Explorar las listas de moda
            </button>
        </div>
    )
}