import React from 'react';

// Assuming you have access to the `buttons` array in your component props
function CatInstruction({ careInstructions }) {
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

export default CatInstruction;