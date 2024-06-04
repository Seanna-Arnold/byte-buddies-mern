// Importing necessary hooks and components from React and the chat UI library
import { useState, useRef, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import "./ChatBot.css"

// API key for accessing the OpenAI API, stored in an environment variable
const API_KEY = process.env.REACT_APP_OPEN_API_KEY;

const ChatBot = () => {
  // useState hooks to manage component state
  const [messages, setMessages] = useState([
    {
      message: "Hello! I'm your friendly PetBot! How can I help you with your furry friends today?",
      sentTime: "just now",
      sender: "PetBot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false); // State to show typing indicator
  const [showChat, setShowChat] = useState(false); // State to toggle chat visibility
  const chatContainerRef = useRef(null); // Ref to detect clicks outside the chat container

  // Function to toggle the visibility of the chat
  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  // useEffect hook to handle clicks outside the chat container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setShowChat(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle sending a message
  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };
  
    // Add the new user message to the state and show typing indicator
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);
  
    try {
      // Process the message and get a response from PetBot
      const response = await processMessageToPetBot([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      
      if (content) {
        // Add PetBot's response to the state
        const petBotResponse = {
          message: content,
          sender: "PetBot",
        };
        setMessages((prevMessages) => [...prevMessages, petBotResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  // Function to process the chat messages and communicate with the OpenAI API
  async function processMessageToPetBot(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "PetBot" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using PetBot for learning about pets" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <button 
        className={`bg-blue-500 text-white w-16 h-16 flex items-center justify-center rounded-full mb-4 text-xs ${showChat ? '' : 'animate-pulse'}`} 
        onClick={handleToggleChat}
      >
        {showChat ? 'Done? 🐾' : 'Chat 🐾'}
      </button>

      <div className={`relative ${showChat ? 'block' : 'hidden'}`}>
        <div ref={chatContainerRef} className="chat-container">
          <MainContainer>
            <ChatContainer className="bg-fff3eb rounded-lg shadow-md">
              <MessageList 
                scrollBehavior="smooth" 
                typingIndicator={isTyping ? <TypingIndicator content="PetBot is typing" /> : null}
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />
                })}
              </MessageList>
              <MessageInput placeholder="Ask me anything about pets!" onSend={handleSendRequest} />        
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
