import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.style.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_NEST_API}/auth/signin`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ocorreu um erro. Tente novamente.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin} className="form">
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
          <button type="submit" className="form-button">Login</button>
        </form>
        <p className="redirect-text">
          Ainda não está cadastrado?{' '}
          <span onClick={() => navigate('/signup')} className="redirect-link">
            Clique aqui
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
