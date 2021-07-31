import { useEffect, useState } from "react";
import chatApi, { ChatMessage } from "./chatApi";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  useEffect(() => {
    async function loadMessages() {
      const loadedMessages = await chatApi.getMessages();
      setMessages(loadedMessages);
      console.log(loadedMessages);
    }
    loadMessages();
  }, []);

  return (
    <>
      {messages.map((message) => (
        <div key={message._id}>
          <span>{message.author}</span>
          <span>{message.message}</span>
          <span>{message.timestamp}</span>
        </div>
      ))}
    </>
  );
}

export default App;
