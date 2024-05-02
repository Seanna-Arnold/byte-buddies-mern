import sendRequest from "./send-request";
const BASE_URL = '/api/pets';

export async function createPet(petData) {
  return sendRequest(BASE_URL, 'POST', petData);
}

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getPetById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function updatePet(id, updatedData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', updatedData);
}

export async function deletePet(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
