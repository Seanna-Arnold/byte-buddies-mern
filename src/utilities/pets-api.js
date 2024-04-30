import sendRequest from "./send-request";
const BASE_URL = '/api/pets';

// export async function createNotes(text) {
//   return sendRequest(BASE_URL, 'POST', text);
// }

// This function is never actually used in SEI CAFE,
// it's only provided here to remind you to follow
// RESTful routing, etc.
export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
  }