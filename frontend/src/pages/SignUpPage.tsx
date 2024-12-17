import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/SignupPage.style.css';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_NEST_API}/auth/signup`, {
        name,
        email,
        password,
      });
      setShowModal(true);
      setErrorMessage(null);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ocorreu um erro. Tente novamente.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2 className="form-title">Cadastro</h2>
        <form onSubmit={handleSignup} className="form">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-container">
            <button type="button" onClick={() => navigate('/login')} className="form-button">
              Voltar
            </button>
            <button type="submit" className="form-button">Cadastrar</button>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>Cadastro realizado com sucesso!</p>
            <button onClick={() => navigate('/login')} className="form-button">
              Ir para Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
