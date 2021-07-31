import styled from "styled-components";
import { IChatMessage } from "./chatApi";

interface ChatMessageProps {
  message: IChatMessage;
  isOwnMessage: boolean;
}

const dateFormatter = new Intl.DateTimeFormat("default", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  return (
    <MessageContainer isOwnMessage={isOwnMessage}>
      {!isOwnMessage && <MessageAuthor>{message.author}</MessageAuthor>}
      <MessageContent>{message.message}</MessageContent>
      <MessageTimestamp isOwnMessage={isOwnMessage}>
        {dateFormatter.format(new Date(message.timestamp))}
      </MessageTimestamp>
    </MessageContainer>
  );
}

const MessageContainer = styled.div<{ isOwnMessage: boolean }>`
  align-self: ${({ isOwnMessage }) =>
    isOwnMessage ? "flex-end" : "flex-start"};
  background-color: ${({ isOwnMessage }) =>
    isOwnMessage ? "#faf5ca" : "#ffffff"};
  border: 1px solid #b9c0c6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 16px 8px 8px 16px;
  max-width: 240px;
`;
const MessageAuthor = styled.span`
  color: #b9c0c6;
  font-size: 0.8rem;
`;
const MessageContent = styled.span``;
const MessageTimestamp = styled.span<{ isOwnMessage: boolean }>`
  color: #b9c0c6;
  font-size: 0.8rem;
  text-align: right;
  text-align: ${({ isOwnMessage }) => (isOwnMessage ? "left" : "right")};
`;

export default ChatMessage;
