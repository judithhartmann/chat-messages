import chatApi, { IChatMessage } from "../chatApi";
import ChatMessage from "../ChatMessage";
import styled from "styled-components";
import { useEffect, useState } from "react";

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
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 24px 16px 24px;
  max-width: 640px;

  > div {
    margin-top: 16px;
  }
`;

export default ChatMessages;
