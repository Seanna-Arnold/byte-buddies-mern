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
  const [showChat, setShowChat] = useState(false); // State to toggle chat visibility
  const chatContainerRef = useRef(null); // Ref for chat container

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

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
  )
}

export default ChatBot;
