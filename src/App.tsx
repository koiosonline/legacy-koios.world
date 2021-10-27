import './App.css';
import './assets/styles/koios.scss';
import Header from "./components/header";
import content from "./assets/data/content.json";
import Hero from "./components/hero";
import Article from "./components/article";
import Footer from "./components/footer";
import World from "./components/World";
import {useRef} from "react";

function App() {

  let articleRef1 = useRef()
  let articleRef2 = useRef()

  return (
    <div className="App">
        <Header
          articleRef1={articleRef1}
          articleRef2={articleRef2}
        />
        <section className={'ctaContainer'}>
          <div className={'ctaContainer__inner'}>
            <Hero
              title={content.hero.title}
              description={content.hero.description}
              />
            <World world={3} />
          </div>
        </section>
        <div className={'contentContainer'}>
            <div className={'contentContainer__articles'}>
                {content.article.map((cardData, index) => (
                    <Article
                      key={index}
                      ref={index === 0 ? articleRef1 : articleRef2}
                      title={cardData.title}
                      description={cardData.description} links={cardData.links}/>
                ))}
            </div>
            <div className={'contentContainer__artwork'}>
                <img src={'/images/artwork5.svg'} alt={'artwork'}/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
