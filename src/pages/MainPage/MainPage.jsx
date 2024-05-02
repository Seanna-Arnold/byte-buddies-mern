import React, { useState, useEffect } from "react";
import * as petsApi from "../../utilities/cats-api";
import CreateCat from "../../components/CreateCat/CreateCat";

export default function MainPage() {
  const [cats, setCats] = useState([]);
  const [changeState, setChangeState] = useState(true);

  useEffect(() => {
    fetchCats();
  }, [changeState]);

  async function fetchCats() {
    try {
      const fetchedCats = await petsApi.getAll();
      setCats(fetchedCats);
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  }

  async function addCat(cat) {
    try {
      await petsApi.createCat(cat);
      fetchCats();
      setChangeState(prevState => !prevState);
    } catch (error) {
      console.error("Error adding cat:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await petsApi.deleteCat(id);
      fetchCats();
      setChangeState(prevState => !prevState);
    } catch (error) {
      console.error("Error deleting cat:", error);
    }
  }
  async function handleUpdate(id, newName) {
    try {
      await petsApi.updateCat(id, { petName: newName });
      fetchCats();
      setChangeState(prevState => !prevState);
    } catch (error) {
      console.error("Error updating cat name:", error);
    }
  }

  return (
    <>
      <h1>Pet Dashboard</h1>
      <CreateCat addCat={addCat} />
      {cats.length !== 0 ?
      <div>
        {cats.map(cat => (
          <div key={cat._id}>
          <a href='/cats'> Care for {cat.petName}</a>
          <input
            type="text"
            value={cat.petName}
            onChange={(e) => handleUpdate(cat._id, e.target.value)}
          />
          <button onClick={() => handleDelete(cat._id)}>Delete</button>
        </div>
        ))}
      </div>
      :
      <p>No cats yet</p>
        }
    </>
  );
}
