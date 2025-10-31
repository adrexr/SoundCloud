import './Cuadros.css'
import img from '../../img/telefonos.png'
import img2 from '../../img/señora.png'
import { BiLogoPlayStore } from "react-icons/bi";
import { FaApple } from "react-icons/fa";

export default function Cuadros({ openModal }) { 
    return (
        <div className='padres'>
            <div className='cuadro1'>
                <img src={img} alt="" />
                <div className='le'>
                    <h1>Llévate la música <br /> contigo</h1>
                    <p>SoundCloud está disponible en Web,<br /> iOS, Android, Sonos, Chromecast y <br /> Xbox One.</p>
                    <div className='conter'>
                       <a href='https://apps.apple.com/es/app/soundcloud-tu-m%C3%BAsica-favorita/id336353151'><button className='store'><FaApple size={35} />Consiguelo en <br /> APP STORE</button></a> 
                        <a href='https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=es'><button className='play'> <BiLogoPlayStore size={30} /> Disponible en <br /> GOOGLE PLAY</button></a>
                    </div>
                </div>
            </div>

            <div className='cuadro2'>
                <div className='le2'>
                    <h1>Llamada a todos los <br /> creadores</h1>
                    <p>Hazte con SoundCloud para estar en contacto  con tus <br /> seguidores, compartir tus canciones y aumentar tu público. ¿A <br /> qué esperas?</p>
                    <a href='https://artists.soundcloud.com/'><button>Mas informacion</button></a>
                </div>
                <div className='imagen-señora'>
                    <img src={img2} alt="" />
                </div>
            </div>
            <div className='abajo'>
                <h1>Gracias por escuchar, ahora unete </h1>
                <h3>Guarda pistas, sigue a artistas y crea tus listas. Y todo, gratis.</h3>
                <button className='crear' onClick={openModal}>Crea tu cuenta</button>
                <div className='cuenta'>
                    <p>¿Ya tienes una cuenta?</p>
                    <button onClick={openModal}>Inicia sesión</button>
                </div>
            </div>
        </div>
    )
}
