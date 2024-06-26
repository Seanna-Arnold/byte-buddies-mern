import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as petsApi from "../../utilities/pets-api";
import CreatePet from "../../components/CreatePet/CreatePet";
import Image from '../../StockIllustrations/vecteezy_set-of-pets-animals_11143527.jpg'

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
    <div className="min-h-screen flex flex-col justify-center items-center -mt-6">
      <img src={Image} alt="" class="mainimg" />
      <h1 className="text-5xl font-bold mb-8">Welcome to Byte Buddies 🐾</h1>
      <CreatePet addPet={addPets} />

      {pets.length !== 0 ?
        <div className="mt-8 flex flex-wrap justify-center">
          {pets.map(pet => (
            <div key={pet._id} className="bg-white rounded-lg shadow-md p-4 m-4">
              <Link to={pet.petType === 'cat' ? `/cats/${pet._id}` : pet.petType === 'rabbit' ? `/rabbits/${pet._id}` : `/dogs/${pet._id}`} className="text-2xl font-bold">
                Care for {pet.petName} {pet.petType === 'cat' ? '🐱' : pet.petType === 'rabbit' ? '🐰' : '🐶'}
              </Link>
              <input
                type="text"
                value={pet.petName}
                onChange={(e) => handleUpdate(pet._id, e.target.value)}
                className="border rounded-md ml-4 p-1"
              />
              <button
                className="px-4 py-1 ml-2 rounded-md"
                onClick={() => handleDelete(pet._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        :
        <p className="text-2xl text-purple-900 font-bold mt-8">No pets yet 😿</p>
      }
    </div>
  );
}
