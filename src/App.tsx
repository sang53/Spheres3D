import "./App.css";
import Background from "./Background/Background";
import BackgroundWrapper from "./contexts/Background/BackgroundWrapper";
import ThemeWrapper from "./contexts/Theme/ThemeWrapper";
import HeaderContainer from "./Header/HeaderContainer/HeaderContainer";
import Style from "./Style/Style";

function App() {
  return (
    <BackgroundWrapper>
      <ThemeWrapper>
        <Background />
        <HeaderContainer />
        <Style />
      </ThemeWrapper>
    </BackgroundWrapper>
  );
}

export default App;
