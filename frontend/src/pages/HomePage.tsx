import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axiosConfig';
import { FaTrashAlt, FaCog } from 'react-icons/fa';
import './styles/HomePage.style.css'; 

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<any>(null); 
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        if (!response.data) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    checkAuth();
    fetchUploadedFiles();
  }, [navigate]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await api.get('/documents/list');
      setUploadedFiles(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar os documentos.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Selecione um arquivo antes de enviar.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      fetchUploadedFiles();
      setFile(null);
    } catch (err) {
      setError('Erro ao enviar o arquivo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/documents/${id}`);
      fetchUploadedFiles();
      setShowModal(null);
    } catch (err) {
      setError('Erro ao deletar o arquivo. Tente novamente.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="settings">
          <FaCog
            size={24}
            onClick={() => setLogoutModal(true)}
            className="settings-icon"
          />
        </div>
      </header>

      <div className="upload-container">
        <h1>Envie seu arquivo para análise</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="upload-box">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? <div className="loader" /> : 'Enviar'}
          </button>
        </div>
      </div>

      <div className="file-list">
        {uploadedFiles.map((file, index) => (
          <div
            className="file-preview"
            key={index}
            onClick={() => setShowModal({ type: 'preview', data: file })}
          >
            <span>{file.filename}</span>
            <FaTrashAlt
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal({ type: 'delete', data: file });
              }}
            />
          </div>
        ))}
      </div>

      {showModal && showModal.type === 'preview' && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-content preview-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <button onClick={() => setShowModal(null)}>Voltar</button>
            </header>
            <div className="modal-body">
              <div className="text-section">
                <h2>Texto Extraído</h2>
                <div className="scroll-box">{showModal.data.extractedText}</div>
              </div>
              <div className="text-section">
                <h2>Resposta da IA</h2>
                <div className="scroll-box">{showModal.data.llmResponse}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && showModal.type === 'delete' && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>Tem certeza que deseja deletar este documento?</p>
            <div className="button-container">
              <button onClick={() => handleDelete(showModal.data.id)}>Sim</button>
              <button onClick={() => setShowModal(null)}>Não</button>
            </div>
          </div>
        </div>
      )}

      {logoutModal && (
        <div className="modal-overlay" onClick={() => setLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>Tem certeza que deseja deslogar?</p>
            <div className="button-container">
              <button onClick={handleLogout}>Sim</button>
              <button onClick={() => setLogoutModal(false)}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
