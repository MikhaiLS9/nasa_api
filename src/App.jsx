import Asteroids from "./components/components";
import Image from "./components/Image";
import styled from "styled-components";

function App() {
  return (
    <div>
      <StyledComponents>
        <StyledEarthImg src={Image.earth} alt="" />
        <Asteroids />
      </StyledComponents>
    </div>
  );
}

export default App;

const StyledComponents = styled.div`
  display: flex;
`;

const StyledEarthImg = styled.img`
  width: 377px;
  height: 436px;
`;
