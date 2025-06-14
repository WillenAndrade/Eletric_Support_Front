import React, { useState } from 'react';
import axios from 'axios';
import './FeedBack.css'
import SecondHeader from './SecondHeader'
import { Link } from 'react-router-dom';

const FeedBack = () => {

  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    e.preventDefault();

    try {
      await axios.post('/api/feedback', { name, suggestion });
      setSuccess('Obrigado pelo seu feedback!');
      setName('');
      setSuggestion('');
    } catch (error) {
      setSuccess('Erro ao enviar feedback.');
    }
  };

    return (
        <div className="feedback-container">
                <SecondHeader />
                <div className="feedback-form-container">
                    <form onSubmit={handleSubmit} id="feedback-form">
                        <div className="feedback-exit"><Link to="/projects" className="feedback-link">x</Link></div>
                        <div className="feedback-top">
                          <div className="es-logo">ES</div>
                          <h1>Eletric Support</h1>
                        </div>
                        <p className='improve'>Como podemos melhorar?</p>
                        <input
                        className="feedback-name-input"
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                        <textarea
                        className="suggestion-text"
                        name="suggestion"
                        rows={4}
                        placeholder="Deixe sua sugestão ou reclamação aqui..."
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        />
                        <div className="form-title"><h2>"Obrigado por usar nosso app, sua opinião é importante para nós!"</h2></div>
                        <button className="feedback-button" type="submit">Enviar</button>
                        {success && <div>{success}</div>}
                        
                    </form>
                </div>
                
         </div>
    )
}

export default FeedBack