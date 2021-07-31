import { useEffect, useState } from "react";
import styled from "styled-components";
import chatApi, { IChatMessage } from "./chatApi";
import ChatMessage from "./ChatMessage";
import backgroundImg from "./background.png";

function App() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  useEffect(() => {
    async function loadMessages() {
      const loadedMessages = await chatApi.getMessages();
      setMessages(loadedMessages);
      console.log(loadedMessages);
    }
    loadMessages();
  }, []);

  return (
    <AppContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <ChatMessage
            key={message._id}
            message={message}
            isOwnMessage={message.author === "Maggie"}
          />
        ))}
      </MessagesContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-image: url(${backgroundImg});
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 24px 16px 24px;
  max-width: 640px;

  > div {
    margin-top: 16px;
  }
`;

export default App;
