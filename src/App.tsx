import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

if (!process.env.REACT_APP_USERNAME) {
  throw new Error("USER NAME MISSING, Please add it .env file");
}
const ownName = process.env.REACT_APP_USERNAME;

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
