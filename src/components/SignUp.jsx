import "./SignUp.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import axiosInstance from '../utils/axiosConfig'


const SignUp = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [showTerms, setShowTerms] = useState(true);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const baseUrl = 'http://localhost:3000'

       const handleSignUp = async (e) => {
            e.preventDefault(); 
        
            if (!validateEmail(email)) {
                setFormError('Por favor, insira um email válido.');
                return;
            }

            if (!acceptedTerms) {
                setFormError("Você precisa aceitar os Termos de Uso.");
                return;
            }
        
            if (password !== confirmPassword) {
                setFormError('As senhas não coincidem.');
                return;
            }
        
            if (!validatePassword(password)) {
                setFormError('Senha deve conter pelo menos 8 caracteres e incluir números.');
                return;
            }
        
            try {
                
                const response = await axiosInstance.post(
                    `${baseUrl}/signup`,
                    { username, email, password },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
        
                
                const { token, refreshToken } = response.data.data;
        
                if (token && refreshToken) {
                    
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('localIsLogged', true); 
        
                
                    window.location.href = '/projects';
                }
            } catch (error) {
                
                if (error.response) {
                    const errorMessage = error.response.data.message;
        
                    if (errorMessage === 'Este email já está em uso.') {
                        setFormError('Este email já está em uso.');
                    } else if (errorMessage === 'Este nome de usuário já está em uso.') {
                        setFormError('Este nome de usuário já está em uso.');
                    } else {
                        setFormError(errorMessage);
                    }
                } else {
                    console.error('Erro ao acessar o servidor:', error);
                    setFormError('Erro ao acessar o servidor.');
                }
            }
        };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
      };

    const validatePassword = (password) => {
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;\"'<>,.?/-]{8,}$/;
    return passwordRegex.test(password);
    };

    return(
        <>
            <div className="general-sign-up">
                <div className={formError.length > 0 ? "sign-up-container":  "sign-up-container active"}>
                    <div className="get-start-btn-container">ES</div>
                    <h1>Criar conta!</h1>
                        <div className="input-container"><div className="form-icons"><FaRegUser size={30}/></div><input className="sign-up-input" type="text" aria-label="Digite seu Usuário" maxLength={35} name="username" id='username' placeholder='Usuário' onChange={(e)=> setUsername(e.target.value)} onClick={(e) => setFormError("")} required/></div>
                        <div className="input-container"><div className="form-icons"><MdOutlineMailOutline size={30}/></div><input className="sign-up-input" type="text" aria-label="Digite seu Email" maxLength={35} name="email" id='email' placeholder='Email' onChange={(e)=> setEmail(e.target.value)} onClick={(e) => setFormError("")} required/></div>
                        <div className="input-container"><div className="form-icons"><RiLockPasswordLine size={30}/></div><input className="sign-up-input" type="password" aria-label="Digite sua Senha" maxLength={35} name="password" id='password' placeholder='Senha' onChange={(e)=> setPassword(e.target.value)} onClick={(e) => setFormError("")} required/></div>
                        <div className="input-container"><div className="form-icons"><RiLockPasswordLine size={30}/></div><input className="sign-up-input" aria-label="Confirme sua senha" type="password" maxLength={35}  id='password' placeholder='Confirme sua senha' onChange={(e)=> setConfirmPassword(e.target.value)} onClick={(e) => setFormError("")} required/></div>
                        <p className={formError.length > 0 ? "formError-p" : "formError-p active"}>{formError}</p>
                        <button onClick={() => setShowTerms(true)} className="terms-btn">
                            Ver Termos de Uso
                         </button>
                        <Link className="privacy-link" to="/privacy">Política de Privacidade</Link>
                        <div className="sign-up-buttons">
                        <Link className="link-to-home" to="/home">Voltar</Link>
                        <button className={ formError.length > 0 ? "sign-up-btn-two" : "sign-up-btn-two active" } onClick={(e)=> handleSignUp(e)}>Cadastrar</button>
                        </div>
                    </div>

                    {showTerms && (
                <div className="modal">
                    <div className="modal-content">
                        <h1>Termos de uso</h1>
                        <div className="terms-text">

                            <h2>ACEITAÇÃO DOS TERMOS</h2>
                            <h3>Ao utilizar o Eletric Support, você declara ter lido, compreendido e aceitado estes Termos de Uso, bem como nossa Política de Privacidade. Se não concordar com alguma condição, não utilize o serviço.</h3>

                            <h2>DEFINIÇÕES</h2>
                            <h3><span>"Eletric Support"</span> refere-se ao serviço oferecido por Eletric Support</h3>
                            <h3><span>"Usuário"</span> refere-se a qualquer pessoa que acesse ou utilize o serviço. refere-se a qualquer pessoa que acesse ou utilize o serviço.</h3>
                            <h3><span>"Conteúdo"</span> inclui textos, imagens, vídeos, código e qualquer outro material disponível no Eletric Support.</h3>

                            <h2>CONDIÇÕES DE USO</h2>
                            <h3>Utilizar o Eletric Support de forma lícita e ética.</h3>
                            <h3>Não realizar atividades que possam comprometer a segurança ou integridade do serviço.</h3>

                            <h2>CADASTRO E CONTA DO USUÁRIO</h2>
                            <h3>O Usuário pode ser solicitado a criar uma conta para acessar determinadas funcionalidades.</h3>
                            <h3>O Usuário é responsável por manter a confidencialidade de suas credenciais.</h3>
                            <h3>A conta pode ser suspensa ou encerrada caso haja violação dos Termos de Uso.</h3>

                            <h2>PROPRIEDADE INTELECTUAL</h2>
                            <h3>Todo o conteúdo do Eletric Support é protegido por direitos autorais e pertence a Willen Andrade ou a terceiros licenciados.</h3>
                            <h3>O uso indevido do conteúdo poderá resultar em sanções legais.</h3>

                            <h2>MODIFICAÇÕES NOS TERMOS</h2>
                            <h3>Podemos atualizar estes Termos de Uso periodicamente. O Usuário será notificado sobre alterações relevantes.</h3>

                            <h2>ENCERRAMENTO E SUSPENSÃO DE CONTA</h2>
                            <h3>Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos de Uso.</h3>

                            <h2>CONTATO E DISPOSIÇÕES GERAIS</h2>
                            <h3>Caso tenha dúvidas, entre em contato pelo e-mail: Willen_Developer@outlook.com</h3>
                            <h3>O foro competente para eventuais disputas será o da cidade de Florianópolis, Estado de Santa Catarina, Brasil.</h3>
                        </div>
                        <button onClick={() => { setAcceptedTerms(true); setShowTerms(false); }} className="accept-btn">
                            Li e aceito os Termos de Uso
                        </button>
                    </div>
                </div>
            )}
            </div>
        </>
    )
}

export default SignUp


