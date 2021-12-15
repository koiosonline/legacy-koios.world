import './App.css';
import './assets/styles/koios.scss';
import Header from "./components/header";
import content from "./assets/data/content.json";
import Hero from "./components/hero";
import Article from "./components/article";
import Footer from "./components/footer";
import World from "./components/World";
// import Calendar from "./components/calendar";
import {useRef} from "react";
import Chart from './components/chart';

function App() {

  const articleRef1 = useRef()
  const articleRef2 = useRef()

  return (
    <div className="App">
        <Header
          articleRef1={articleRef1}
          articleRef2={articleRef2}
        />
        <section className={'cta-container'}>
          <div className={'cta-container__inner'}>
            <Hero
              title={content.hero.title}
              description={content.hero.description}
              />
            <World world={3} />
          </div>
        </section>
        {/* <section className={'calendar-container'}>
          <div className={'calendar-container__inner'}>
            <Calendar />
          </div>
        </section> */}
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
                {/* <img src={'/images/artwork5.svg'} alt={'artwork'}/> */}
                {/* <h2>Decentralization</h2> */}
                <Chart/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
