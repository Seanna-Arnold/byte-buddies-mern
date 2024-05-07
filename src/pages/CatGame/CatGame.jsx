import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import CatButton from '../../components/CatButton/CatButton';
import ChatBot from '../ChatBot/ChatBot';

import PetInstruction from '../../components/PetInstruction/PetInstruction';
import * as petsApi from "../../utilities/pets-api";
import lowHealthImage from '../../catGameImages/lowHealthImage.png';
import mediumHealthImage from '../../catGameImages/mediumHealthImage.png';
import highHealthImage from '../../catGameImages/highHealthImage.png';
import zeroHealthImage from '../../catGameImages/zeroHealthImage.png';

export default function CatGame() {
  const healthImages = {
    0: zeroHealthImage,
    1: lowHealthImage,
    2: lowHealthImage,
    3: mediumHealthImage,
    4: mediumHealthImage,
    5: highHealthImage,
  };

  const catButtons = ['Hydrate', 'Feed', 'Snuggle', 'VetVisit', 'Play', 'CleanLitterBox', 'CutNailsAndBrushFur'];
  const catInstruction = ['There\'s no more water!', 'My tummy is growling', 'I wanna cuddle', 'I feel...sick', 'Zoomies!!!', 'Litter box is getting stanky', 'Hair is everywhere and I\'m scratching up the couch'];
  const catFact = {
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
    vetvisit: [
      "Cats are masters at hiding signs of illness, so regular vet check-ups are essential for catching health issues early.",
      "Many cats dislike carriers and car rides, so acclimating them to carriers and making vet visits as stress-free as possible is important.",
      "Routine vaccinations, parasite prevention, and dental care are crucial aspects of preventive healthcare for cats."
    ],
    play: [
      "Playtime provides mental stimulation for cats and helps prevent behavioral issues caused by boredom.",
      "Cats have predatory instincts, so toys that mimic hunting behavior, such as wand toys and feather teasers, are often favorites.",
      "Rotating toys regularly and providing a variety of textures and interactive toys keeps playtime engaging for cats."
    ],
    cleanlitterbox: [
      "Cats are more likely to avoid using a dirty litter box, leading to inappropriate elimination behaviors.",
      "Litter boxes should be scooped at least once daily and completely emptied and cleaned with mild soap and water regularly.",
      "The general rule for the number of litter boxes in a household is one box per cat plus one extra to prevent territorial issues and provide options."
    ],
    cutnailsandbrushfur: [
      "Trimming a cat's nails regularly helps prevent them from becoming overgrown, which can cause discomfort and lead to ingrown nails.",
      "Cats may need their nails trimmed every 1-2 weeks, depending on their activity level and the rate of nail growth.",
      "Regular brushing helps reduce shedding, prevents matting, and distributes natural oils in a cat's fur, keeping it healthy and shiny."
    ]
  };

  const catFactsArray = catInstruction.map((instruction, index) => {
    const key = catButtons[index].toLowerCase();
    return { instruction, facts: catFact[key] };
  });

  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [pet, setPet] = useState(null);
  const [health, setHealth] = useState(5);
  const [currentImage, setCurrentImage] = useState(highHealthImage); 
  const [changeState] = useState(true);
  const [currentFacts, setCurrentFacts] = useState(catFactsArray[currentInstructionIndex].facts[0]);
  const { id } = useParams();

  const shuffleInstruction = (buttonIndex) => {
    if (buttonIndex === currentInstructionIndex) {
      if (health < 5) {
        setHealth(prevHealth => {
          const newHealth = Math.min(prevHealth + 1, 5);
          handleUpdate(newHealth);
          return newHealth;
        });
      }
      const newIndex = Math.floor(Math.random() * catInstruction.length);
      const randomFact = Math.floor(Math.random() * 3);
      setCurrentInstructionIndex(newIndex);
      setCurrentFacts(catFactsArray[newIndex].facts[randomFact]);
      console.log(newIndex, catFactsArray[newIndex])
    } else {
      if (health > 0) {
        setHealth(prevHealth => {
          const newHealth = Math.max(prevHealth - 1, 0);
          handleUpdate(newHealth);
          return newHealth;
        });
      }
    }
  };

  useEffect(() => {
    fetchPet();
  }, []);

  useEffect(() => {
    setCurrentImage(healthImages[health]);
  }, [health, healthImages]);
  
  async function fetchPet() {
    try {
      const fetchedPet = await petsApi.getPetById(id);
      console.log(fetchedPet);
      setPet(fetchedPet);
      if (fetchedPet && fetchedPet.health) {
        setHealth(fetchedPet.health);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  }

  async function handleUpdate(newHealth) {
    try {
      if (!pet || !pet._id) {
        console.error("No pet ID found.");
        return;
      }
      await petsApi.updatePet(pet._id, { health: newHealth });
      setHealth(newHealth);
    } catch (error) {
      console.error("Error updating pet health:", error);
    }
  }

  return (
    <div className="min-h-screen bg-FFE7D6 flex flex-col justify-center items-center">
      <img src={currentImage} alt="Pet Image" className="mb-4 h-48 w-55 object-cover" />
      <h1 className="text-3xl font-bold mb-4">{pet ? pet.petName : "Cat Game"}</h1>

      {health > 0 && (
        <div className="details bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="petInfo">
            <p>Health: {health}❤️</p>
            {health === 1 && <p className="text-red-600">You're about to kill me</p>}
          </div>

          <ul className="careInstructions mt-4">
            <h2 className="font-semibold mb-2">Instructions:</h2>
            <PetInstruction careInstructions={[catInstruction[currentInstructionIndex]]} /><br/>
            <ul id="instructions" className="p-4 rounded-lg">
              <li className="text-sm"><span className="text-lg">💡</span> {currentFacts}</li>
            </ul>
          </ul>
        </div>
      )}

      {health <= 0 && (
        <>
        <p className="text-red-600">You killed me, how could you?</p>
        <p>(Don't worry, we can start over, just hit refresh)</p>
        </>
      )}

      {health > 0 && (
        <div className="game">
          <h2 className="font-semibold mb-2">Cat Care Buttons</h2>
          <div className="flex flex-wrap gap-2">
            {catButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => shuffleInstruction(index)}
                className="px-4 py-2 rounded-md shadow-md"
              >
              {button}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="absolute bottom-16 right-20">
        <ChatBot />
      </div>
    </div>
  );
}
