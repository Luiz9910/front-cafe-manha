export const API_URL = 'http://localhost:8080/';


export function listCafeDaManha() {
  return {
    url: API_URL + 'cafemanha/lista',
    options: {
      method: 'GET',
    },
  };
}

export function listCafeDaManhaByData(data) {
  return {
    url: API_URL + `cafemanha/por-data?data=${data}`,
    options: {
      method: 'GET',
    },
  };
}

export function adicionarCafeDaManha(body) {
  return {
    url: API_URL + 'cafemanha',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    },
  };
}

export function atualizarCafeDaManha(id) {
  return {
    url: API_URL + `cafemanha/${id}`,
    options: {
      method: 'PATCH',
    },
  };
}

export function atualizarCafeDaManhaEntrega(body) {
  return {
    url: API_URL + `cafedamanha/atualizar`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    },
  };
}

export function deleteCafe(id) {
  return {
    url: API_URL + `cafemanha/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}