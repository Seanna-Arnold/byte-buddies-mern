import React, { useState } from 'react';
import CatButton from '../../components/CatButton/CatButton';
import CatInstruction from '../../components/CatInstruction/CatInstruction';

export default function CatGame() {
  const catButton = ['Hydrate', 'Feed', 'Snuggle', 'Vet Visit', 'Play', 'Clean Litter box', 'Cut Nails & Brush Fur'];
  const catInstruction = ['There\'s no more water!', 'My tummy is growling', 'I wanna cuddle', 'I feel...sick', 'Zoomies!!!', 'Litter box is getting stanky', 'Hair is everywhere and I\'m scratching up the couch'];
  const catCareFacts = {
    hydrate: [
      "Cats have a low thirst drive compared to other animals because their ancestors got most of their hydration from prey.",
      "Feeding wet food can help increase a cat's water intake since it has a high moisture content.",
      "Cats prefer drinking from wide, shallow dishes rather than deep bowls to avoid their sensitive whiskers touching the sides."
    ],
    feed: [
      "Cats are obligate carnivores, meaning they require nutrients found only in animal tissue to survive.",
      "Free-feeding, where food is constantly available, can lead to obesity in cats. Controlled portion feeding is recommended.",
      "Cats have taste receptors for bitter flavors, which is thought to be an evolutionary adaptation to avoid eating toxic plants."
    ],
    snuggle: [
      "Cats show affection by rubbing against their owners, which marks them with their scent glands and signifies ownership.",
      "Curling up on their owner's lap can provide cats with warmth and security, mimicking the feeling of being nestled with their mother as kittens.",
      "Slow blinking at a cat is a sign of trust and affection in cat language, and reciprocating this gesture can strengthen the bond between cat and owner."
    ],
    vetVisit: [
      "Cats are masters at hiding signs of illness, so regular vet check-ups are essential for catching health issues early.",
      "Many cats dislike carriers and car rides, so acclimating them to carriers and making vet visits as stress-free as possible is important.",
      "Routine vaccinations, parasite prevention, and dental care are crucial aspects of preventive healthcare for cats."
    ],
    play: [
      "Playtime provides mental stimulation for cats and helps prevent behavioral issues caused by boredom.",
      "Cats have predatory instincts, so toys that mimic hunting behavior, such as wand toys and feather teasers, are often favorites.",
      "Rotating toys regularly and providing a variety of textures and interactive toys keeps playtime engaging for cats."
    ],
    cleanLitterBox: [
      "Cats are more likely to avoid using a dirty litter box, leading to inappropriate elimination behaviors.",
      "Litter boxes should be scooped at least once daily and completely emptied and cleaned with mild soap and water regularly.",
      "The general rule for the number of litter boxes in a household is one box per cat plus one extra to prevent territorial issues and provide options."
    ],
    cutNailsAndBrushFur: [
      "Trimming a cat's nails regularly helps prevent them from becoming overgrown, which can cause discomfort and lead to ingrown nails.",
      "Cats may need their nails trimmed every 1-2 weeks, depending on their activity level and the rate of nail growth.",
      "Regular brushing helps reduce shedding, prevents matting, and distributes natural oils in a cat's fur, keeping it healthy and shiny."
    ]
  };

  const catFactsArray = catInstruction.map((instruction, index) => {
    const key = catButton[index].toLowerCase(); //getting key corresponding to the button
    return { instruction, facts: catCareFacts[key] }; // Create object with instruction and corresponding facts
  });

  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

  const [health, setHealth] = useState(5);

  const [currentFacts, setCurrentFacts] = useState(catFactsArray[currentInstructionIndex].facts);

  // Function shuffles and sets new instruction index
  const shuffleInstruction = (buttonIndex) => {
    // Check if the button index matches the index of the displayed instruction
    if (buttonIndex === currentInstructionIndex) {
      if (health < 5) {
        setHealth(prevHealth => Math.min(prevHealth + 1, 5)); 
      }
      // shuffle instruction
      const newIndex = Math.floor(Math.random() * catInstruction.length);
      setCurrentInstructionIndex(newIndex);
      setCurrentFacts(catFactsArray[newIndex].facts); // Update the facts array
    } else {
      // Wrong button clicked, decrease health if not minimum
      if (health > 0) {
        setHealth(prevHealth => Math.max(prevHealth - 1, 0));
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
          <ul>
            {currentFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
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
