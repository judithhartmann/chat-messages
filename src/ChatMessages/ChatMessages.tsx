import { useEffect, useState } from "react";
import styled from "styled-components";
import chatApi, { IChatMessage } from "../chatApi";
import ChatMessage from "../ChatMessage";
import backgroundImg from "./background.png";

interface ChatMessagesProps {
  ownName: string;
}

function ChatMessages({ ownName }: ChatMessagesProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  useEffect(() => {
    async function loadMessages() {
      const loadedMessages = await chatApi.getMessages();
      setMessages(loadedMessages);
    }
    loadMessages();
  }, []);

  return (
    <MessagesContainer>
      {messages.map((message) => (
        <ChatMessage
          key={message._id}
          message={message}
          isOwnMessage={message.author === ownName}
        />
      ))}
    </MessagesContainer>
  );
}

const MessagesContainer = styled.div`
  background-image: url(${backgroundImg});
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 24px 16px 24px;

  > div {
    margin-top: 16px;
  }
`;

export default ChatMessages;
