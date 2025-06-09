import './Home.css'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../utils/axiosConfig'
import HomeMarketing from './HomeMarketing'

const Home = () => {
    const [usernameOrEmail, setUserNameOrEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogged, setIsLogged] = useState(localStorage.getItem('localIsLogged'))
    const [toggleLoginBtn, setToggleLoginBtn] = useState(false)
    const [message, setMessage] = useState(false)
    const baseUrl = 'http://localhost:3000'
    
    useEffect(()=>{
        if(isLogged == "true") {
            window.location.href = '/projects'
        }
            console.log(`LocalSlogged: ${localStorage.getItem("localIsLogged")}`)
    })

    useEffect(()=> {
        localStorage.removeItem("userNameOrEmail")
    },[])

        const Login = async (e) => {
            e.preventDefault();

            try {
                console.log('Iniciando login...');
                const response = await axiosInstance.post(`/login`, { usernameOrEmail, password });
                localStorage.setItem("userNameOrEmail", usernameOrEmail)
                console.log('Resposta do servidor:', response.data);
                const { token, refreshToken } = response.data.data;
                console.log('Tokens recebidos:', { token, refreshToken });
                if (token && refreshToken) {
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem("localIsLogged", true);
                    window.location.href = '/projects';
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log('Credenciais inválidas.');
                    setMessage(true);
                } else {
                    console.log('Erro ao acessar o servidor.');
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
         <HomeMarketing />
        </>
    )
}

export default Home
