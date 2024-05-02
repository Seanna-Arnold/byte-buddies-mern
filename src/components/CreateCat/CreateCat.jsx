import React, { useState } from 'react';
import * as petsApi from '../../utilities/cats-api';

export default function CreateCatForm() {
  const [formData, setFormData] = useState({
    petName: '',
    // health: 5, // Default health value
    // emotion: 'happy', // Default emotion value
    // careInstructions: '',
    // buttons: '',
    // type: '',
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
      await petsApi.createCat(formData);
      // Optionally, you can reset the form after submission
      setFormData({
        petName: '',
        // health: 5,
        // emotion: 'happy',
        // careInstructions: '',
        // buttons: '',
        // type: '',
        // infoPopup: ''
      });
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating cat:', error);
      // Handle error, e.g., show an error message
      alert('Error creating cat. Please try again.');
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
      <button type="submit">Create Cat</button>
    </form>
  );
}
