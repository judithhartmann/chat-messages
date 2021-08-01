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
    <MessagesContainer role="log" aria-live="polite">
      <ul>
        {messages.map((message) => (
          <ChatMessage
            key={message._id}
            message={message}
            isOwnMessage={message.author === ownName}
          />
        ))}
      </ul>
    </MessagesContainer>
  );
}

const MessagesContainer = styled.div`
  background-image: url(${backgroundImg});
  flex: 1;
  max-height: calc(100vh - 69px);
  padding: 0 24px 16px 24px;
  overflow-x: scroll;

  > ul {
    display: flex;
    flex-direction: column;
    padding: 0;

    > li {
      margin-top: 16px;
    }
  }
`;

export default memo(ChatMessages);
