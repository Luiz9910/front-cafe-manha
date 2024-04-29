import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./style.css";
import useFetch from '../../hooks/useFetch';
import { adicionarCafeDaManha } from '../../api/Api';

const Insert = () => {
  const [nomeColaborador, setNomeColaborador] = useState('');
  const [cpfColaborador, setCpfColaborador] = useState('');
  const [cafeManha, setCafeManha] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { request, error } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      nomeColaborador,
      cpfColaborador,
      cafe: cafeManha,
      data: dataEntrega
    };

    const { url, options } = adicionarCafeDaManha(formData);
    const { response, json } = await request(url, options);

    try {
      if (response.status === 201) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        setErrorMessage(error.messages[0]);
      }
    } catch (error) {
      setErrorMessage("Erro ao processar resposta. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <div className="insert-container">
      {showSuccessMessage && (
        <div className="success-card">
          Tudo certo! Café da manhã adicionado com sucesso.
        </div>
      )}
      {errorMessage && (
        <div className="error-card" style={{padding: "20px 0"}}>
          Erro: {errorMessage}
        </div>
      )}
      <h1>Adicionar Café da Manhã</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nomeColaborador">Nome do Colaborador:</label>
          <input 
            type="text" 
            id="nomeColaborador" 
            value={nomeColaborador} 
            onChange={(e) => setNomeColaborador(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpfColaborador">CPF:</label>
          <input 
            type="text" 
            id="cpfColaborador" 
            value={cpfColaborador} 
            onChange={(e) => setCpfColaborador(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="cafeManha">Café da Manhã:</label>
          <input 
            type="text" 
            id="cafeManha" 
            value={cafeManha} 
            onChange={(e) => setCafeManha(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataEntrega">Data de Entrega:</label>
          <input 
            type="date" 
            id="dataEntrega" 
            value={dataEntrega} 
            onChange={(e) => setDataEntrega(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Adicionar Café</button>
      </form>
    </div>
  );
};

export default Insert;
