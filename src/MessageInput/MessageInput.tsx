import { FormEvent, memo, useState } from "react";
import styled from "styled-components";

interface MessageInputProps {
  sendMessage: (message: string) => Promise<void>;
}

function MessageInput({ sendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await sendMessage(message);
    setMessage("");
  };
  return (
    <MessageInputForm onSubmit={onSubmit}>
      <MessageInputField
        autoComplete="off"
        autoFocus
        type="text"
        aria-label="Message"
        placeholder="Message"
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <MessageSubmitButton disabled={message.length === 0} type="submit">
        Send
      </MessageSubmitButton>
    </MessageInputForm>
  );
}

const MessageInputForm = styled.form`
  background-color: #5197cf;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  width: 100%;
`;

const MessageInputField = styled.input`
  border-radius: 4px;
  flex: 1;
  margin-right: 8px;
`;

const MessageSubmitButton = styled.button`
  background-color: #f08d74;
  border-radius: 4px;
  border: none;
  font-size: 1.1rem;
  color: #ffffff;
  padding: 8px 16px;
`;

export default memo(MessageInput);
