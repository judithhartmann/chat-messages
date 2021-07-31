import styled from "styled-components";
import backgroundImg from "./background.png";
import ChatMessages from "./ChatMessages";

const ownName = "Maggie";

function App() {
  return (
    <AppContainer>
      <ChatMessages ownName={ownName} />
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

export default App;
