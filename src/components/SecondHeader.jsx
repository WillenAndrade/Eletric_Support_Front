import './SecondHeader.css'
import { Link } from 'react-router-dom'
import { IoMdExit } from "react-icons/io";
const SecondHeader = () => {

     const handleLogout = () => {
        localStorage.removeItem("localIsLogged"); 
        localStorage.removeItem("accessToken");  
        localStorage.removeItem("refreshToken"); 
        localStorage.removeItem("localIsLogged");
        window.location.href = "/login"; 
    };

    return (
        <div className="secondHeader">
            <div className="es-logo">ES</div>
            <div className="allLinks">
                <Link to="/feedback">Feedback</Link>
                </div>

            <div className='logout' onClick={()=> handleLogout()}><span>Sair</span><IoMdExit size={28} color='white' /></div>
        </div>
    )
}

export default SecondHeader