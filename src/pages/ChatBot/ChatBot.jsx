import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = process.env.REACT_APP_OPEN_API_KEY;

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello! I'm your friendly PetBot! How can I help you with your furry friends today?",
      sentTime: "just now",
      sender: "PetBot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);
  
    try {
      const response = await processMessageToPetBot([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      
      if (content) {
        const petBotResponse = {
          message: content,
          sender: "PetBot",
        };
        setMessages((prevMessages) => [...prevMessages, petBotResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };
  

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
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-purple-200 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Chat with PetBot 🐾</h1>
      <div className="relative rounded-lg overflow-hidden w-96 h-96">
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
  )
}

export default ChatBot;
