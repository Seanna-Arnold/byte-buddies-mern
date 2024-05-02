import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as petsApi from "../../utilities/pets-api";
import CreateCat from "../../components/CreatePet/CreatePet";

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
    <>
      <h1>Pet Dashboard</h1>
      <CreateCat addPet={addPets} />
      {pets.length !== 0 ?
      <div>
        {pets.map(pet => (
          <div key={pet._id}>
          <Link to= {`/pets/${pet._id}`}> Care for {pet.petName}</Link>
          <input
            type="text"
            value={pet.petName}
            onChange={(e) => handleUpdate(pet._id, e.target.value)}
          />
          <button onClick={() => handleDelete(pet._id)}>Delete</button>
        </div>
        ))}
      </div>
      :
      <p>No pets yet</p>
        }
    </>
  );
}
