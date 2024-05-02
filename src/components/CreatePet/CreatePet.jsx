import React, { useState } from 'react';
import * as petsApi from '../../utilities/pets-api';

export default function CreatePetForm() {
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    // health: 5,
    // careInstructions: '',
    // buttons: '',
    // infoPopup: ''
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
      await petsApi.createPet(formData);
      // Optionally, you can reset the form after submission
      setFormData({
        petName: '',
        petType: '',
        // health: 5,
        // careInstructions: '',
        // buttons: '',
        // infoPopup: ''
      });
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
      {/* Add other input fields for health, emotion, careInstructions, buttons, type, infoPopup */}
      <button type="submit">Create Pet</button>
    </form>
  );
}
