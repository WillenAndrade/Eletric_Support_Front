import './HomeMarketing.css'
import { Link } from 'react-router-dom'
const HomeMarketing = () => {
    return (
        <>
        <div className='homeMarketing'>
           <div className="homeText">
                 <h1>"Simplifique esquemas Elétricos profissionais em Minutos!"</h1>
                 <Link  className="btn-signup-link"to="/signup">Cadastrar</Link>
           </div> 
        </div>
        <div className="marketingfooter"></div>
        </>
    )
}   
export default HomeMarketing