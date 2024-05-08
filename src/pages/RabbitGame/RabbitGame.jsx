import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatBot from '../ChatBot/ChatBot';
import PetInstruction from '../../components/PetInstruction/PetInstruction';
import * as petsApi from "../../utilities/pets-api";
import lowHealthImage from '../../rabbitGameImages/lowHealthImage.png';
import mediumHealthImage from '../../rabbitGameImages/mediumHealthImage.png';
import highHealthImage from '../../rabbitGameImages/highHealthImage.png';
import zeroHealthImage from '../../rabbitGameImages/zeroHealthImage.png';

export default function RabbitGame() {
  const healthImages = {
    0: zeroHealthImage,
    1: lowHealthImage,
    2: lowHealthImage,
    3: mediumHealthImage,
    4: mediumHealthImage,
    5: highHealthImage,
  };

  const rabbitButtons = ['Hydrate', 'Feed', 'Exercise', 'VetVisit', 'Play', 'Groom', 'Train', 'LitterTraining'];
  const rabbitInstruction = ['I need water!', 'My tummy is empty', 'I need to hop around', 'I don\'t feel well', 'Let\'s play!', 'I need grooming', 'Teach me!', 'I need to use the litter box'];
  const rabbitFact = {
    hydrate: [
      "Rabbits need access to fresh water at all times to stay hydrated and healthy. Ensure your rabbit's water bottle or bowl is clean and filled regularly.",
      "During hot weather, rabbits may need additional water to prevent dehydration. Monitor their water intake and offer extra hydration as needed.",
      "Some rabbits enjoy water-based activities like hopping through shallow water or playing with water toys. This can provide mental stimulation and enrichment."
    ],
    feed: [
      "Rabbits have specific dietary needs, including hay, fresh vegetables, and pellets formulated for rabbits. Provide a balanced diet to maintain their health.",
      "Avoid feeding rabbits foods that are toxic to them, such as chocolate, avocado, and iceberg lettuce. Research safe and suitable foods for your rabbit's diet.",
      "Offering a variety of foods and textures can keep rabbits interested in their meals and help prevent boredom. Monitor their food intake and adjust portions as needed."
    ],
    exercise: [
      "Regular exercise is crucial for a rabbit's physical and mental well-being. Provide ample space for them to hop and explore, both indoors and outdoors if possible.",
      "Allowing rabbits to exercise helps prevent obesity, promotes healthy digestion, and supports natural behaviors like digging and jumping.",
      "Supervise outdoor playtime to ensure your rabbit's safety and protect them from predators, extreme temperatures, and toxic plants. Provide plenty of shade and water."
    ],
    vetvisit: [
      "Routine veterinary check-ups are essential for monitoring your rabbit's health and detecting any potential issues early. Find a vet experienced in treating rabbits for optimal care.",
      "Many rabbits may feel anxious or stressed during vet visits. Minimize their stress by using a carrier designed for rabbits and providing familiar bedding or toys.",
      "In addition to regular check-ups, be vigilant for signs of illness or injury in your rabbit, such as changes in appetite, behavior, or bathroom habits. Seek prompt veterinary care when needed."
    ],
    play: [
      "Playtime is important for rabbits to prevent boredom and provide mental stimulation. Offer a variety of toys and activities to keep them engaged and entertained.",
      "Toys like cardboard tubes, tunnels, and puzzle feeders are great for rabbits to explore and interact with. Rotate toys regularly to maintain their interest.",
      "Supervise play sessions to ensure your rabbit's safety and intervene if they show signs of distress or aggression. Encourage gentle interaction and positive reinforcement."
    ],
    groom: [
      "Regular grooming helps keep your rabbit's coat clean, healthy, and free of mats. Brushing removes loose fur, reduces shedding, and prevents hairballs.",
      "Bathing rabbits is generally unnecessary and can stress them out. Spot clean soiled areas with a damp cloth and trim any long fur around the hindquarters for hygiene.",
      "Trimming your rabbit's nails regularly is important to prevent them from becoming overgrown and causing discomfort. Use pet-specific nail clippers and avoid cutting the quick."
    ],
    train: [
      "Training can help rabbits learn basic commands and behaviors, such as coming when called or using a litter box. Use positive reinforcement techniques like treats and praise.",
      "Keep training sessions short, fun, and rewarding to maintain your rabbit's interest and motivation. Be patient and consistent in your approach.",
      "Consider clicker training as a gentle and effective method for teaching rabbits new behaviors. Start with simple tasks and gradually increase difficulty as they learn."
    ],
    littertraining: [
      "Litter training rabbits can help keep their living area clean and reduce odors. Use a litter box filled with rabbit-safe litter and place it in a quiet, accessible spot.",
      "Place some soiled bedding or droppings in the litter box to attract your rabbit to use it. Encourage them with treats and praise when they use the litter box correctly.",
      "Accidents may happen during the litter training process. Clean up accidents promptly and avoid punishment, as it can confuse and stress your rabbit."
    ]
  };

  const rabbitFactsArray = rabbitInstruction.map((instruction, index) => {
    const key = rabbitButtons[index].toLowerCase();
    return { instruction, facts: rabbitFact[key] };
  });

  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [pet, setPet] = useState(null);
  const [health, setHealth] = useState(5);
  const [currentImage, setCurrentImage] = useState(highHealthImage); 
  const [currentFacts, setCurrentFacts] = useState(rabbitFactsArray[currentInstructionIndex].facts[0]);
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
      const newIndex = Math.floor(Math.random() * rabbitInstruction.length);
      const randomFact = Math.floor(Math.random() * 3);
      setCurrentInstructionIndex(newIndex);
      setCurrentFacts(rabbitFactsArray[newIndex].facts[randomFact]);
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
      <img src={currentImage} alt="Pet Image" className="mb-4 h-48 w-48 object-cover" />
      <h1 className="text-3xl font-bold mb-4">{pet ? pet.petName : "Rabbit Game"}</h1>

      {health > 0 && (
        <div className="details bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="petInfo">
            <p>Health: {health}❤️</p>
            {health === 1 && <p className="text-red-600">You're about to kill me</p>}
          </div>

          <ul className="careInstructions mt-4">
            <h2 className="font-semibold mb-2">Instructions:</h2>
            <PetInstruction careInstructions={[rabbitInstruction[currentInstructionIndex]]} /><br/>
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
          <h2 className="font-semibold mb-2">Rabbit Care Buttons</h2>
          <div className="flex flex-wrap gap-2">
            {rabbitButtons.map((button, index) => (
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
