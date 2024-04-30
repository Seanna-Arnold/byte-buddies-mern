import React, { useState } from 'react';
import CatButton from '../../components/CatButton/CatButton';
import CatInstruction from '../../components/CatInstruction/CatInstruction';

export default function CatGame() {
  const catButton = ['Hydrate', 'Feed', 'Snuggle', 'Vet Visit', 'Play', 'Clean Litter box', 'Cut Nails & Brush Fur'];
  const catInstruction = ['There\'s no more water!', 'My tummy is growling', 'I wanna cuddle', 'I feel...sick', 'Zoomies!!!', 'Litter box is getting stanky', 'Hair is everywhere and I\'m scratching up the couch'];

  // State stores index of displayed instruction
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  // State stores the pet's health
  const [health, setHealth] = useState(5);

  // Function shuffles and sets new instruction index
  const shuffleInstruction = (buttonIndex) => {
    // Check if the button index matches the index of the displayed instruction
    if (buttonIndex === currentInstructionIndex) {
      // Correct button clicked, increase health if not already at maximum
      if (health < 5) {
        setHealth(prevHealth => Math.min(prevHealth + 1, 5)); // Ensure health doesn't exceed 5
      }
      // Shuffle instruction
      const newIndex = Math.floor(Math.random() * catInstruction.length);
      setCurrentInstructionIndex(newIndex);
    } else {
      // Wrong button clicked, decrease health if not already at minimum
      if (health > 0) {
        setHealth(prevHealth => Math.max(prevHealth - 1, 0)); // Ensure health doesn't go below 0
      }
    }
  };

  return (
    <>
      <h1>Cat Game</h1>

      <div className="details">
        <div className="petInfo">
          <h4>Pet Info</h4>
          <p>Health: {health}❤️</p>
        </div>

        <ul className="careInstructions">
          <CatInstruction careInstructions={[catInstruction[currentInstructionIndex]]} />
        </ul>
      </div>

      <div className="game">
        <p>😸</p>

        <h2>Cat Care Buttons</h2>
        <CatButton buttons={catButton} onClick={shuffleInstruction} />
      </div>
    </>
  );
}
