import React from 'react';

// Assuming you have access to the `buttons` array in your component props
function PetInstruction({ careInstructions }) {
  return (
    <ul>
      {careInstructions.map((instruction, index) => (
        <li key={index}>
          <p>{instruction}</p>
        </li>
      ))}
    </ul>
  );
}

export default PetInstruction;