import "./styles.css";

import PageMainTitle from "./components/generic/PageMainTitle/PageMainTitle";
import Container from "./components/layout/Container/Container";
import ImagesFinder from "./components/ImagesFinder/ImagesFinder";

export default function App() {
  return (
    <div className="App">
      <Container>
        <PageMainTitle text="Images Finder" />
        <ImagesFinder />
      </Container>
    </div>
  );
}
