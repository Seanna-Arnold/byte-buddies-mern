import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as petsApi from '../../utilities/pets-api';
// import AuthPage from '../../pages/AuthPage/AuthPage';
// import { getUser } from '../../utilities/users-service';

export default function CreatePetForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petName: '',
    petType: '', // Adding petType field
    health: 5,
    // user: '' 
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
      const newPet = await petsApi.createPet(formData);
      // Optionally, you can reset the form after submission
      setFormData({
        petName: '',
        petType: '', // Reset petType field
        health: 5,
        // user: '' 
      });
      navigate(`/pets/${newPet._id}`);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pet Name:
        <input
          type="text"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Pet Type:
        <select
          name="petType"
          value={formData.petType}
          onChange={handleChange}
          required
        >
          <option value="">Select Pet Type</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
      </label>
      {/* Add other input fields for health, emotion, careInstructions, buttons, infoPopup */}
      <button type="submit">Create Pet</button>
    </form>
  );
}
