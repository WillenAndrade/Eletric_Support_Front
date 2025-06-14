/*import { Routes, Route } from 'react-router-dom'
import CircuitsForm from './components/CircuitsForm'
import Table from './components/Table'
import ProjectsScreen from './components/ProjectsScreen'
import Home from './components/Home'
import SignUp from './components/SignUp'


const App = () => {
    return(
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/projects' element={<ProjectsScreen/>}/>
                <Route path="/circuits" element={<CircuitsForm/>} />
                <Route path='/table' element={<Table/>} />
            </Routes>
        </div>
    )
}

export default App*/

import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CircuitsForm from './components/CircuitsForm';
import Table from './components/Table';
import ProjectsScreen from './components/ProjectsScreen';
import Home from './components/Home';
import SignUp from './components/SignUp';
//import { refreshAccessToken } from './utils/axiosConfig';  // Importa a função de renovação de token
import axiosInstance, { refreshAccessToken } from './utils/axiosConfig';
import PrivacyPolicy from './components/PrivacyPolicy';
import FeedBack from './components/FeedBack';

const App = () => {
    const [isAuthReady, setIsAuthReady] = useState(false); // Para saber se a autenticação foi verificada

    useEffect(() => {
        const checkTokenAndFetchData = async () => {
            await refreshAccessToken();  // Chama a função para renovar o token se necessário
            setIsAuthReady(true);  // Marca que a autenticação foi verificada
        };

        checkTokenAndFetchData();
    }, []);

    // Se a autenticação não foi verificada ainda, mostre uma tela de carregamento
    if (!isAuthReady) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/projects' element={<ProjectsScreen />} />
                <Route path="/circuits" element={<CircuitsForm />} />
                <Route path='/table' element={<Table />} />
                <Route path="*" element={<Navigate to="/" />} /> 
                <Route path='/privacy' element={<PrivacyPolicy />} />
                <Route path='/feedback' element={<FeedBack />} />
                
            </Routes>
        </div>
    );
};

export default App;

// <Route path='/projects' element={isAuthenticated ? <ProjectsScreen /> : <Navigate to="/signup" />} />
