import sendRequest from "./send-request";
const BASE_URL = '/api/cats';

export async function createCat(catData) {
  return sendRequest(BASE_URL, 'POST', catData);
}

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getCatById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updateCat(id, updatedData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', updatedData);
}

export async function deleteCat(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
