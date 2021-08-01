import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import chatApi, { IChatMessage } from "./chatApi";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

if (!process.env.REACT_APP_USERNAME) {
  throw new Error("USER NAME MISSING, Please add it .env file");
}
const ownName = process.env.REACT_APP_USERNAME;
const pollingInverval = 1000 * 5; // 5s

function App() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const lastMessageTimestamp = useMemo(
    () => Math.max(...messages.map((message) => message.timestamp)),
    [messages]
  );

  // load all messages on mount
  useEffect(() => {
    async function loadAllMessages() {
      const loadedMessages = await chatApi.getMessages();
      setMessages(loadedMessages);
    }
    loadAllMessages();
  }, []);

  // poll new messages
  const fetchLatestMessages = useCallback(async () => {
    const loadedMessages = await chatApi.getMessages(lastMessageTimestamp);
    setMessages((existingMessages) =>
      existingMessages.concat(...loadedMessages)
    );
  }, [lastMessageTimestamp]);

  useEffect(() => {
    const intervalId = setInterval(fetchLatestMessages, pollingInverval);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchLatestMessages]);

  const sendMessage = useCallback(
    async (message: string) => {
      await chatApi.sendMessage(ownName, message);
      await fetchLatestMessages();
    },
    [fetchLatestMessages]
  );

  return (
    <AppContainer>
      <ContentContainer>
        <ChatMessages messages={messages} ownName={ownName} />
        <MessageInput sendMessage={sendMessage} />
      </ContentContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 640px;
  width: 100%;
`;

export default App;
