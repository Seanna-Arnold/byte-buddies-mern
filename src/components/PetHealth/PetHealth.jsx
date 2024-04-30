import React from 'react';

// Assuming you have access to the `buttons` array in your component props
function PetHealth({ health }) {
  return (
    <ul>
      {health.map((petHealth, index) => (
        <li key={index}>
          <p>{petHealth}</p>
        </li>
      ))}
    </ul>
  );
}

export default PetHealth;