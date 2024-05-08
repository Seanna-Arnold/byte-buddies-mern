import React, { useState } from 'react';

export default function CreatePet({ addPet }) {
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
      setFormData({
        petName: '',
        petType: '',
        health: '',
      });
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 flex items-center">
      <label className="block text-sm font-semibold mr-4" htmlFor="petName">
        Pet Name:
      </label>
      <input
        className="appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-4"
        id="petName"
        type="text"
        name="petName"
        value={formData.petName}
        onChange={handleChange}
        required
      />
      <label className="block text-sm font-semibold mr-4" htmlFor="petType">
        Pet Type:
      </label>
      <select
        className="appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-4"
        id="petType"
        name="petType"
        value={formData.petType}
        onChange={handleChange}
        required
      >
        <option value="">select pet type  </option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
        <option value="rabbit">Rabbit</option>
      </select>
      <button
        className="font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline whitespace-nowrap"
        type="submit"
      >
  Create Pet
</button>

    </form>
  );
}
