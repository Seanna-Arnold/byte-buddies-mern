import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import CatButton from '../../components/CatButton/CatButton';
import ChatBot from '../ChatBot/ChatBot';

import PetInstruction from '../../components/PetInstruction/PetInstruction';
import * as petsApi from "../../utilities/pets-api";
import lowHealthImage from '../../catGameImages/lowHealthImage.jpg';
import mediumHealthImage from '../../catGameImages/mediumHealthImage.jpg';
import highHealthImage from '../../catGameImages/highHealthImage.jpg';
import zeroHealthImage from '../../catGameImages/zeroHealthImage.jpg';

export default function DogGame() {
  const healthImages = {
    0: zeroHealthImage,
    1: lowHealthImage,
    2: lowHealthImage,
    3: mediumHealthImage,
    4: mediumHealthImage,
    5: highHealthImage,
  };

  const dogButtons = ['Hydrate', 'Feed', 'Walk', 'VetVisit', 'Play', 'Groom', 'Train', 'PottyTraining'];
  const dogInstruction = ['There\'s no more water!', 'My tummy is growling', 'I wanna go outside', 'I feel...sick', 'Can we play fetch?', 'I...smell', 'Teach me some cool tricks!', 'I may have peed on the floor'];
  const dogFact = {
    Hydrate: [
      "Dogs require fresh water to stay hydrated and healthy. Always ensure your dog has access to clean water throughout the day.",
      "During hot weather or after vigorous exercise, dogs may need more water to prevent dehydration. Be sure to offer extra water during these times.",
      "Some dogs enjoy playing with water, such as splashing in a kiddie pool or playing with a sprinkler. This can be a fun way to keep them cool and hydrated."
    ],
    Feed: [
      "Dogs have specific dietary needs based on factors like age, size, and activity level. Choose a high-quality dog food that meets these requirements.",
      "Avoid feeding dogs certain foods that can be toxic to them, such as chocolate, grapes, onions, and garlic. Consult with your vet if you're unsure about what foods are safe.",
      "Feeding dogs on a consistent schedule can help regulate their digestion and prevent obesity. Splitting their daily food portion into multiple meals can also be beneficial."
    ],
    Walk: [
      "Regular walks are essential for a dog's physical and mental well-being. Aim for at least one walk per day, but some dogs may require more depending on their breed and energy level.",
      "Walking provides dogs with exercise, mental stimulation, and an opportunity to explore their environment through scent.",
      "Be sure to use a sturdy leash and collar or harness during walks to keep your dog safe and under control. Always clean up after your dog by properly disposing of waste."
    ],
    VetVisit: [
      "Regular veterinary check-ups are crucial for monitoring your dog's health and detecting any potential issues early. Your vet can provide guidance on vaccinations, parasite prevention, and overall wellness.",
      "Many dogs may feel anxious or stressed during vet visits. Help alleviate their fears by making the experience as positive and comfortable as possible.",
      "In addition to routine check-ups, be proactive about seeking veterinary care if you notice any changes in your dog's behavior, appetite, or physical condition."
    ],
    Play: [
      "Playtime is not only fun for dogs but also provides physical exercise and mental stimulation. Engage in interactive games like fetch, tug-of-war, or hide-and-seek to keep your dog active and entertained.",
      "Toys can be a valuable tool for playtime, but be sure to choose ones that are safe and appropriate for your dog's size, age, and chewing habits.",
      "Rotate your dog's toys regularly to keep them engaged and prevent boredom. Supervise play sessions to ensure safety and prevent accidental ingestion of toys."
    ],
    Groom: [
      "Regular grooming helps keep your dog's coat healthy and free of mats and tangles. Brushing removes loose hair, distributes natural oils, and stimulates the skin.",
      "Bathe your dog as needed, but avoid over-bathing as it can strip their coat of natural oils and lead to skin irritation. Use a dog-specific shampoo and rinse thoroughly.",
      "In addition to brushing and bathing, don't forget to trim your dog's nails, clean their ears, and brush their teeth regularly to maintain their overall hygiene."
    ],
    Train: [
      "Training is an essential part of responsible dog ownership and helps establish good behavior and communication between you and your dog.",
      "Use positive reinforcement techniques, such as treats, praise, and toys, to motivate and reward desired behaviors.",
      "Be patient and consistent with training, and practice regularly to reinforce commands and prevent regression. Consider enrolling in obedience classes or working with a professional trainer for guidance."
    ],
    PottyTraining: [
      "Potty training is an important aspect of owning a dog, especially for puppies. Establish a regular schedule for bathroom breaks and take your dog outside frequently, especially after meals, naps, and playtime.",
      "Choose a designated bathroom area outside and consistently take your dog to that spot to encourage elimination. Use verbal cues or commands to help them associate the area with going to the bathroom.",
      "Accidents are inevitable during the potty training process. When accidents occur indoors, clean them up promptly and avoid punishment, as it can confuse and stress your dog."
    ]
  };

  const dogFactsArray = dogInstruction.map((instruction, index) => {
    const key = dogButtons[index]; //getting key corresponding to the button
    return { instruction, facts: dogFact[key] }; // Create object with instruction and corresponding facts
  });
  
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [pet, setPet] = useState(null);
  const [health, setHealth] = useState(5); // State variable to track health
  const [currentImage, setCurrentImage] = useState(highHealthImage); 
  const [changeState] = useState(true);
  console.log(dogFactsArray)
  const [currentFacts, setCurrentFacts] = useState(dogFactsArray[currentInstructionIndex].facts[0]);
  const {id} = useParams();
  // Function shuffles and sets new instruction index
  const shuffleInstruction = (buttonIndex) => {
    if (buttonIndex === currentInstructionIndex) {
      if (health < 5) {
        setHealth(prevHealth => {
          const newHealth = Math.min(prevHealth + 1, 5);
          handleUpdate(newHealth);
          return newHealth;
        });
      }
      const newIndex = Math.floor(Math.random() * dogInstruction.length);
      const randomFact = Math.floor(Math.random() * 3);
      setCurrentInstructionIndex(newIndex);
      setCurrentFacts(dogFactsArray[newIndex].facts[randomFact]);
      console.log(newIndex, dogFactsArray[newIndex])
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
      <img src={currentImage} alt="Pet Image" className="mb-4 rounded-full h-48 w-48 object-cover" />
      <h1 className="text-3xl font-bold mb-4">{pet ? pet.petName : "Cat Game"}</h1>

      {health > 0 && (
        <div className="details bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="petInfo">
            <p>Health: {health}❤️</p>
            {health === 1 && <p className="text-red-600">You're about to kill me</p>}
          </div>

          <ul className="careInstructions mt-4">
            <h2 className="font-semibold mb-2">Instructions:</h2>
            <PetInstruction careInstructions={[dogInstruction[currentInstructionIndex]]} /><br/>
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
          <h2 className="font-semibold mb-2">Dog Care Buttons</h2>
          <div className="flex flex-wrap gap-2">
            {dogButtons.map((button, index) => (
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
