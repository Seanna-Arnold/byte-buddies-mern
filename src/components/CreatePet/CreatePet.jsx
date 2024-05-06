import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as petsApi from '../../utilities/pets-api';

export default function CreatePet({ addPet }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    health: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addPet(formData)
      // Optionally, you can reset the form after submission
      setFormData({
        petName: '',
        petType: '',
        health: '',
      });
      // Handle success, show a success message
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 flex items-center">
      <label className="block text-gray-700 text-sm font-semibold mr-4" htmlFor="petName">
        Pet Name:
      </label>
      <input
        className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
        id="petName"
        type="text"
        name="petName"
        value={formData.petName}
        onChange={handleChange}
        required
      />
      <label className="block text-gray-700 text-sm font-semibold mr-4" htmlFor="petType">
        Pet Type:
      </label>
      <select
        className="appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
        id="petType"
        name="petType"
        value={formData.petType}
        onChange={handleChange}
        required
      >
        <option value="">select pet type  </option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
      </select>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-10 rounded focus:outline-none focus:shadow-outline whitespace-nowrap"
        type="submit"
      >
  Create Pet
</button>

    </form>
  );
}
