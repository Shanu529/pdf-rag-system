import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatView from "../ui/ChatView";

function ChatContainer() {

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const backend_endpoint = import.meta.env.VITE_BACKEND_URL;

  const sendMessage = async (text) => {

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true);
        console.log( "backend endpoint", `${backend_endpoint}/api/chat/general`,);
     
    try {

      const response = await axios.post(
        `${backend_endpoint}/api/chat/general`,
        {
          question: text,
          messages : [
            ...messages,
            userMsg
          ]
        }
      );

      console.log("llm response" , response);
      
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.data.Answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Something went wrong",
        },
      ]);

    } finally {

      setIsTyping(false);

    }
  };

  return (
    <ChatView
    
      mode="general"
      folderName="AI"
      messages={messages}
      sendMessage={sendMessage}
      isTyping={isTyping}
    />
  );
}

export default ChatContainer;