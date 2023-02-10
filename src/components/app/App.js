import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';


function App() {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar/>
        <section className="char__content">
          <CharList/>
          <CharInfo/>
        </section>
        <img className="bg-decoration" src={decoration} alt="vision"/>
      </main>
    </div>
  );
}

export default App;
