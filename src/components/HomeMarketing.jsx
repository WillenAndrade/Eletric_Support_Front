import './HomeMarketing.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const HomeMarketing = () => {
    const [toggleInfo, setToggleInfo] = useState(false)

    return (
        <>
        <div className='homeMarketing'>
           <div className="homeText">
                 <h1>"Simplifique esquemas Elétricos profissionais em Minutos!"</h1>
                 <Link  className="btn-signup-link"to="/signup">Cadastrar</Link>
           </div> 
        </div>
        
       {!toggleInfo ? <div className="marketing-footer">
         <p onClick={()=>setToggleInfo(true)} onMouseEnter={()=>setToggleInfo(true)} className='my-name'>Create by <span> Willen Andrade</span></p>
        </div> :  <div className="toggleInfoDiv">
            <h2><span>Willen_Developer@outlook.com</span></h2>
            <h2><span>(18) 99736 7874</span></h2>
        </div>}
        </>
    )
}   
export default HomeMarketing
