import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

const ownName = "Maggie";

function App() {
  return (
    <AppContainer>
      <ContentContainer>
        <ChatMessages ownName={ownName} />
        <MessageInput ownName={ownName} />
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
