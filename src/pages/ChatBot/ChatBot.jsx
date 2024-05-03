// import { useState, useEffect }  from 'react';
// // import './App.css';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from '@chatscope/chat-ui-kit-react';

// const API_KEY = process.env.REACT_APP_OPEN_API_KEY;

// const ChatBot = () => {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT",
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSendRequest = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: "user",
//     };
  
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setIsTyping(true);
  
//     try {
//       const response = await processMessageToChatGPT([...messages, newMessage]);
//       const content = response.choices[0]?.message?.content;
//       console.log(response)
//       if (content) {
//         const chatGPTResponse = {
//           message: content,
//           sender: "ChatGPT",
//         };
//         setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
//       }
//     } catch (error) {
//       console.error("Error processing message:", error);
//     } finally {
//       setIsTyping(false);
//     }
//   };
  

//   async function processMessageToChatGPT(chatMessages) {
//     const apiMessages = chatMessages.map((messageObject) => {
//       const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
//       return { role, content: messageObject.message };
//     });

//     const apiRequestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         { role: "system", content: "I'm a Student using ChatGPT for learning" },
//         ...apiMessages,
//       ],
//     };

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer " + API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiRequestBody),
//     });

//     return response.json();
//   }

//   return (
//     <div className="App">
//       <div style={{ position:"relative", height: "800px", width: "700px"  }}>
//         <MainContainer>
//           <ChatContainer>       
//             <MessageList 
//               scrollBehavior="smooth" 
//               typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
//             >
//               {messages.map((message, i) => {
                
//                 return <Message key={i} model={message} />
//               })}
//             </MessageList>
//             <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />        
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   )
// }

// export default ChatBot;
// //"You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors."


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
    <div className="App">
      <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
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
