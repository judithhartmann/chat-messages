import { memo } from "react";
import styled from "styled-components";
import { IChatMessage } from "../chatApi";
import ChatMessage from "../ChatMessage";
import backgroundImg from "./background.png";

interface ChatMessagesProps {
  messages: IChatMessage[];
  ownName: string;
}

function ChatMessages({ messages, ownName }: ChatMessagesProps) {
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

export default memo(ChatMessages);
