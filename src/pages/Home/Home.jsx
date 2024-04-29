import React, { useEffect, useState } from "react";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import { deleteCafe, listCafeDaManhaByData, atualizarCafeDaManha } from "../../api/Api";

const Home = () => {
  const [cafes, setCafes] = useState([]);
  const [filtroData, setFiltroData] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { request } = useFetch();

  const handleDeleteCafe = async (id) => {
    const { url, options } = deleteCafe(id);
    const {response} = await request(url, options);
  
    if (response.status === 204) {
      setCafes(cafes.filter((cafe) => cafe.id !== id));
      alert("Café excluído com sucesso!");
      window.location.reload();
    }
  };

  const handleEntregarCafe = async (id) => {
    const { url, options } = atualizarCafeDaManha(id);
    const { response } = await request(url, options);
  
    if (response.status === 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    async function listaCafeManhaPorData() {
      if (!filtroData) return;

      const { url, options } = listCafeDaManhaByData(filtroData);
      const { response, json } = await request(url, options);

      if (response.status === 200) {
        setCafes(json);
      }

      if (response.status === 204) {
        console.log("Lista vazia");
        setCafes([]);
      }
    }

    listaCafeManhaPorData();
  }, [filtroData, request]);

  return (
    <main>
      <h1>Lista de Cafés</h1>
      <input
        type="date"
        value={filtroData}
        onChange={(e) => setFiltroData(e.target.value)}
      />
      {cafes.length === 0 && (
        <p className="empty-list-message">
          Não há nenhum café da manhã para hoje.
        </p>
      )}
      {cafes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome do Colaborador</th>
              <th>CPF</th>
              <th>Café</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cafes.map((cafe) => (
              <tr key={cafe.id || Math.random()} className="cafe-item">
                <td>{cafe.nomeColaborador}</td>
                <td>{cafe.cpfColaborador}</td>
                <td>{cafe.cafe}</td>
                <td>{cafe.data}</td>
                <td>
                  {cafe.data === filtroData && (
                    <>
                      {!cafe.entrega && (
                        <button
                          onClick={() => handleEntregarCafe(cafe.id)}
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            marginRight: "10px",
                          }}
                        >
                          Entregar
                        </button>
                      )}
                      <button onClick={() => handleDeleteCafe(cafe.id)}>
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Home;
