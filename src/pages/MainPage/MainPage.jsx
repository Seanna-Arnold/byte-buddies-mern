import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as petsApi from "../../utilities/pets-api";
import CreateCat from "../../components/CreatePet/CreatePet";
import ChatBot from "../ChatBot/ChatBot";

export default function MainPage() {
  const [pets, setPets] = useState([]);
  const [changeState, setChangeState] = useState(true);

  useEffect(() => {
    fetchPets();
  }, [changeState]);

  async function fetchPets() {
    try {
      const fetchedPets = await petsApi.getAll();
      setPets(fetchedPets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  }

  async function addPets(pet) {
    try {
      await petsApi.createPet(pet);
      fetchPets();
      setChangeState(prevState => !prevState);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await petsApi.deletePet(id);
      fetchPets();
      setChangeState(prevState => !prevState);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  }
  async function handleUpdate(id, newName) {
    try {
      await petsApi.updatePet(id, { petName: newName });
      fetchPets();
      setChangeState(prevState => !prevState);
    } catch (error) {
      console.error("Error updating pet name:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-purple-200 flex flex-col justify-center items-center">
      <h1 className="text-6xl text-pink-900 font-bold mb-8">Welcome to Pet Dashboard 🐾</h1>
      <CreateCat addPet={addPets} />

      {pets.length !== 0 ?
        <div className="mt-8 flex flex-wrap justify-center">
          {pets.map(pet => (
            <div key={pet._id} className="bg-white rounded-lg shadow-md p-4 m-4">
              <Link to={`/cats/${pet._id}`} className="text-2xl font-bold text-purple-900 hover:text-purple-600">Care for {pet.petName}</Link>
              <input
                type="text"
                value={pet.petName}
                onChange={(e) => handleUpdate(pet._id, e.target.value)}
                className="border border-purple-500 rounded-md ml-4 p-1"
              />
              <button className="bg-purple-600 text-white px-4 py-1 ml-2 rounded-md hover:bg-purple-700" onClick={() => handleDelete(pet._id)}>Delete</button>
            </div>
          ))}
        </div>
        :
        <p className="text-2xl text-purple-900 font-bold mt-8">No pets yet 😿</p>
      }
      
    </div>
  );
}
