import React, { useEffect, useState } from "react";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import { listCafeDaManha } from "../../api/Api";

const Home = () => {
  const [cafes, setCafes] = useState([]);
  const [filtroData, setFiltroData] = useState("");
  const { loading, request } = useFetch();

  const handleDeleteCafe = (id) => {
    setCafes(cafes.filter((cafe) => cafe.id !== id));
  };

  useEffect(() => {
    async function listaCafeManha() {
      const { url, options } = listCafeDaManha();
      const { response, json } = await request(url, options);

      if (response.status === 200) {
        setCafes(json);
      }

      if (response.status === 204) {
        console.log("Lista vazia");
      }
    }
    listaCafeManha();
  }, [request]);

  return (
    <main>
      <h1>Lista de Cafés</h1>
      <input
        type="date"
        value={filtroData}
        onChange={(e) => setFiltroData(e.target.value)}
      />
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
                <button onClick={() => handleDeleteCafe(cafe.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Home;
