import './Home.css'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [usernameOrEmail, setUserNameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogged, setIsLogget] = useState(localStorage.getItem('localIsLogged'))
    const [toggleLoginBtn, setToggleLoginBtn] = useState(false)
    const [message, setMessage] = useState(false)
    const baseUrl = 'http://localhost:3000'
    
    useEffect(()=>{
        if(isLogged == "true") {
            window.location.href = '/projects'
        }
            console.log(`LocalSlogged: ${localStorage.getItem("localIsLogged")}`)
    })


const Login = async (e) => {
    e.preventDefault();  // Prevent default form submission

    try {
        // Send the login request with username and password
        const response = await axios.post(
            `${baseUrl}/login`,
            JSON.stringify({ usernameOrEmail, password }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        // Assuming the backend responds with a JWT token
        const { token } = response.data;

        if (token) {
            // Store the token in localStorage after successful login
            localStorage.setItem('authToken', token);  // Save the JWT token in localStorage
            localStorage.setItem("localIsLogged", true);  // Optionally save login status

            // Redirect user to the projects page
            window.location.href = '/projects';
        }

       // window.alert(`Logged in successfully. Token: ${token}`);
       // console.log(`Logged in successfully. Token: ${token}`)

    } catch (error) {
        if (!error.response) {
            console.log("Error while accessing the server.");
        } else if (error.response.status === 401) {
            console.log("Invalid credentials...");
            setMessage(true); // Show message for invalid credentials
        }
    }
};

    return (
        <>
         <div className="home-container">
            <header onMouseLeave={(e) => setToggleLoginBtn(false)}>
                <div className="es-logo" onMouseEnter={(e) => setToggleLoginBtn(false)}><p className="es-logo-p">ES</p></div>
                <div className={toggleLoginBtn ? "form-login active" : "form-login"}>
                    <form>
                        <input onClick={(e) => setMessage(false)} type="text" maxLength={35} name="usernameOrEmail" id='username' placeholder='Usuário' onChange={(e)=> setUserNameOrEmail(e.target.value)} required/>
                        <input onClick={(e) => setMessage(false)} type="password" maxLength={25} name="password" id="password" placeholder='Senha' onChange={(e)=> setPassword(e.target.value)} required/>
                        <button onClick={(e)=> Login(e)}>Entrar</button>
                    </form>
                    <p className={message ?'message': "message active"}>Usuário ou senha inválidos!</p>
                </div>
                <div className={!toggleLoginBtn ? "toggle-login-div active" : "toggle-login-div"}>
                    <p className="login-btn" onClick={(e) => setToggleLoginBtn(true)} onMouseEnter={(e) => setToggleLoginBtn(true)}>Login</p>
                    <Link to="/signup" className="sign-up-btn" target="_blank" rel="noopener noreferrer">Cadastro</Link>
                    </div>   
            </header>
            <div className="home-buttons">
                <div className="get-start-btn">ES</div>
            </div>
            <div className="main-title">
                <h1 className='es-title'>Eletric Support! </h1>
            </div>
            <div className="secundary-title">
                <h2>"O poder de cálculos de circuitos sem esforço."</h2>
            </div>
         </div>
        </>
    )
}

export default Home
